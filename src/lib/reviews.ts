import { REVIEWS_CONFIG, reviewsFormConfigured } from "@/config/reviews";
import { buildWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";
import { approvedReviews } from "@/data/reviews";

export interface Review {
  id?: string;
  name: string;
  service: string;
  rating: number;
  text: string;
  date?: string;
}

export interface NewReview {
  name: string;
  service: string;
  rating: number;
  text: string;
}

/** Minimal CSV parser that handles quoted cells, commas and line breaks inside quotes. */
export const parseCsv = (csv: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    if (inQuotes) {
      if (c === '"' && csv[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (c === '"') inQuotes = false;
      else cell += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(cell);
      cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && csv[i + 1] === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((x) => x.trim()));
};

const APPROVED_VALUES = ["yes", "y", "true", "approved", "✓", "✔", "1"];

/** Turns the published sheet into approved reviews, newest first. */
export const rowsToReviews = (rows: string[][]): Review[] => {
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (...keys: string[]) => header.findIndex((h) => keys.some((k) => h.includes(k)));
  const iName = col("name");
  const iService = col("service");
  const iRating = col("rating", "star");
  const iText = col("review", "comment", "message");
  const iApproved = col("approved", "approve", "publish", "show");
  const iDate = col("timestamp", "date");
  if (iApproved < 0 || iText < 0) return [];

  return rows
    .slice(1)
    .filter((r) => APPROVED_VALUES.includes((r[iApproved] || "").trim().toLowerCase()))
    .map((r) => ({
      name: (r[iName] || "Client").trim(),
      service: iService >= 0 ? (r[iService] || "").trim() : "",
      rating: Math.min(5, Math.max(1, Math.round(Number(r[iRating]) || 5))),
      text: (r[iText] || "").trim(),
      date: iDate >= 0 ? (r[iDate] || "").trim() : undefined,
    }))
    .filter((r) => r.text)
    .reverse();
};

export type ReviewsMode = "live" | "sheet" | "whatsapp";

let cache: Promise<Review[]> | null = null;
let mode: ReviewsMode = "whatsapp";
export const reviewsMode = () => mode;

/** Live reviews from /api/reviews (Vercel storage). Returns null if it isn't set up. */
const fetchLive = async (): Promise<Review[] | null> => {
  try {
    const res = await fetch("/api/reviews", { cache: "no-store" });
    if (!res.ok || !(res.headers.get("content-type") || "").includes("application/json")) return null;
    const data = (await res.json()) as { live?: boolean; reviews?: Review[] };
    return data.live ? data.reviews ?? [] : null;
  } catch {
    return null;
  }
};

const fetchSheet = async (): Promise<Review[]> => {
  try {
    const r = await fetch(REVIEWS_CONFIG.sheetCsvUrl, { cache: "no-store" });
    return r.ok ? rowsToReviews(parseCsv(await r.text())) : [];
  } catch {
    return [];
  }
};

/**
 * Loads reviews. Priority:
 *  1. Live storage (/api/reviews) — reviews appear instantly
 *  2. Google Sheet, if configured
 *  3. Otherwise only the list in src/data/reviews.ts
 */
export const fetchReviews = (): Promise<Review[]> => {
  if (!cache) {
    cache = (async () => {
      const live = await fetchLive();
      if (live) {
        mode = "live";
        return [...live, ...approvedReviews];
      }
      if (REVIEWS_CONFIG.sheetCsvUrl) {
        mode = reviewsFormConfigured() ? "sheet" : "whatsapp";
        return [...(await fetchSheet()), ...approvedReviews];
      }
      mode = reviewsFormConfigured() ? "sheet" : "whatsapp";
      return approvedReviews;
    })();
  }
  return cache;
};

/** Clears the cache so the next fetch shows the newest reviews. */
export const refreshReviews = () => {
  cache = null;
  return fetchReviews();
};

export class ReviewError extends Error {}

/** Removes a live review (Simi's admin link). */
export const deleteReview = async (id: string, adminKey: string) => {
  const res = await fetch(`/api/reviews?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { "x-admin-key": adminKey },
  });
  if (!res.ok) throw new ReviewError(res.status === 401 ? "Wrong admin key." : "Couldn't delete the review.");
};

/**
 * Sends a review to the Google Form. Google doesn't allow reading the reply
 * from another website ("no-cors"), so a completed request counts as sent.
 * If the form isn't configured yet, the review opens in WhatsApp instead.
 */
export const submitReview = async (r: NewReview & { website?: string }): Promise<ReviewsMode> => {
  if (mode === "live") {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(r),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new ReviewError((data as { error?: string }).error || "Couldn't post your review. Please try again.");
    }
    return "live";
  }
  if (mode === "whatsapp" || !reviewsFormConfigured()) {
    const msg = [
      "Hello, I'd like to leave a review for Simi Aesthetic.",
      "",
      `Name: ${r.name}`,
      `Service: ${r.service || "—"}`,
      `Rating: ${"★".repeat(r.rating)} (${r.rating}/5)`,
      `Review: ${r.text}`,
    ].join("\n");
    openWhatsApp(buildWhatsAppUrl(msg));
    return "whatsapp";
  }
  const f = REVIEWS_CONFIG.fields;
  const body = new URLSearchParams({
    [f.name]: r.name,
    [f.service]: r.service,
    [f.rating]: String(r.rating),
    [f.review]: r.text,
  });
  await fetch(REVIEWS_CONFIG.formActionUrl, { method: "POST", mode: "no-cors", body });
  return "sheet";
};
