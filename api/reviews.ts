/**
 * Reviews API — a tiny Vercel serverless function (no separate server).
 * Storage: Upstash Redis, added from the Vercel dashboard (see REVIEWS_SETUP.md).
 *
 *   GET    /api/reviews            → { live: true, reviews: [...] }
 *   POST   /api/reviews            → saves a review; it shows on the site immediately
 *   DELETE /api/reviews?id=…       → removes a review (needs header x-admin-key = REVIEWS_ADMIN_KEY)
 */

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const ADMIN_KEY = process.env.REVIEWS_ADMIN_KEY || "";

const KEY = "simi:reviews";
const MAX_STORED = 500;
const SERVICES = ["", "Lash Extensions", "Cluster Lashes", "Brows", "Tattoo"];

interface StoredReview {
  id: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  date: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const redis = async (...command: (string | number)[]) => {
  const res = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify(command),
  });
  if (!res.ok) throw new Error(`Storage error ${res.status}`);
  return ((await res.json()) as { result: unknown }).result;
};

const configured = () => Boolean(URL_ && TOKEN);

/** Removes control characters and trims. */
const clean = (v: unknown, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

const readAll = async (): Promise<{ raw: string; review: StoredReview }[]> => {
  const items = ((await redis("LRANGE", KEY, 0, MAX_STORED - 1)) as string[]) || [];
  return items.flatMap((raw) => {
    try {
      return [{ raw, review: JSON.parse(raw) as StoredReview }];
    } catch {
      return [];
    }
  });
};

export async function GET() {
  if (!configured()) return json({ live: false, reviews: [] }, 503);
  try {
    const all = await readAll();
    return json({ live: true, reviews: all.map((x) => x.review) });
  } catch {
    return json({ live: false, reviews: [] }, 502);
  }
}

export async function POST(request: Request) {
  if (!configured()) return json({ error: "Reviews storage is not set up yet." }, 503);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: real visitors never fill this hidden field
  if (clean(body.website, 100)) return json({ ok: true }, 200);

  const name = clean(body.name, 60);
  const text = clean(body.text, 500);
  const service = clean(body.service, 40);
  const rating = Math.round(Number(body.rating));

  if (name.length < 2) return json({ error: "Please enter your name." }, 400);
  if (text.length < 10) return json({ error: "Please write a little more (10+ characters)." }, 400);
  if (!(rating >= 1 && rating <= 5)) return json({ error: "Please choose a star rating." }, 400);
  if (!SERVICES.includes(service)) return json({ error: "Unknown service." }, 400);
  if (/https?:\/\/|www\./i.test(text + name)) return json({ error: "Links aren't allowed in reviews." }, 400);

  // Basic rate limit: one review per visitor per 10 minutes
  const ip = (request.headers.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  try {
    const ok = await redis("SET", `simi:rl:${ip}`, "1", "EX", 600, "NX");
    if (ok !== "OK") return json({ error: "Thanks! You've just left a review — please try again later." }, 429);

    const review: StoredReview = {
      id: crypto.randomUUID(),
      name,
      service,
      rating,
      text,
      date: new Date().toISOString(),
    };
    await redis("LPUSH", KEY, JSON.stringify(review));
    await redis("LTRIM", KEY, 0, MAX_STORED - 1);
    return json({ ok: true, review }, 201);
  } catch {
    return json({ error: "Couldn't save your review right now. Please try again." }, 502);
  }
}

export async function DELETE(request: Request) {
  if (!configured()) return json({ error: "Not set up." }, 503);
  if (!ADMIN_KEY || request.headers.get("x-admin-key") !== ADMIN_KEY) return json({ error: "Not allowed." }, 401);
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return json({ error: "Missing id." }, 400);
  try {
    const match = (await readAll()).find((x) => x.review.id === id);
    if (!match) return json({ error: "Not found." }, 404);
    await redis("LREM", KEY, 1, match.raw);
    return json({ ok: true });
  } catch {
    return json({ error: "Couldn't delete right now." }, 502);
  }
}
