import { FormEvent, useEffect, useState } from "react";
import { Star, Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchReviews, refreshReviews, submitReview, reviewsMode, ReviewError, type Review } from "@/lib/reviews";

const SERVICE_OPTIONS = ["Lash Extensions", "Cluster Lashes", "Brows", "Tattoo"];

export const Stars = ({ value, className = "w-4 h-4" }: { value: number; className?: string }) => (
  <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} className={`${className} ${n <= value ? "fill-foreground text-foreground" : "text-foreground/20"}`} />
    ))}
  </span>
);

/** Loads reviews once; call refresh() after posting or deleting. */
export const useReviewsState = () => {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  useEffect(() => {
    let alive = true;
    fetchReviews().then((r) => alive && setReviews(r));
    return () => {
      alive = false;
    };
  }, []);
  const refresh = () => refreshReviews().then(setReviews);
  return { reviews, refresh };
};

export const useReviews = () => useReviewsState().reviews;

export const ReviewCard = ({ review, onDelete }: { review: Review; onDelete?: () => void }) => (
  <figure className="relative h-full flex flex-col rounded-3xl bg-white border border-border/70 p-7 shadow-soft">
    {onDelete && (
      <button
        type="button"
        onClick={onDelete}
        className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full border border-destructive/40 px-3 py-1 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" /> Delete
      </button>
    )}
    <Stars value={review.rating} />
    <blockquote className="mt-4 flex-1 font-heading text-lg leading-relaxed text-foreground">
      “{review.text}”
    </blockquote>
    <figcaption className="mt-6 flex items-center gap-3">
      <span className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-semibold">
        {review.name.charAt(0).toUpperCase()}
      </span>
      <span className="leading-tight">
        <span className="block font-semibold text-sm text-foreground">{review.name}</span>
        {review.service && <span className="block text-xs text-muted-foreground">{review.service}</span>}
      </span>
    </figcaption>
  </figure>
);

const fieldBase =
  "w-full rounded-xl border border-input bg-white px-4 text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground";

export const ReviewForm = ({ onPosted }: { onPosted?: () => void }) => {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — real people never fill this
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "live" | "sheet" | "whatsapp" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // Make sure we know which mode is active before the visitor submits
  useEffect(() => {
    fetchReviews();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (website) return; // bot
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Please enter your name.";
    if (!rating) errs.rating = "Please choose a star rating.";
    if (text.trim().length < 10) errs.text = "Please write at least a few words (10+ characters).";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    try {
      const result = await submitReview({ name: name.trim(), service, rating, text: text.trim(), website });
      setStatus(result);
      if (result === "live") onPosted?.();
    } catch (err) {
      setErrorMsg(err instanceof ReviewError ? err.message : "Something went wrong — please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "live" || status === "sheet" || status === "whatsapp") {
    return (
      <div className="rounded-3xl bg-white border border-border/70 p-8 sm:p-10 text-center shadow-soft">
        <div className="w-14 h-14 mx-auto rounded-full bg-foreground text-background flex items-center justify-center">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="mt-5 font-heading text-2xl text-foreground">Thank you, {name.split(" ")[0]}!</h3>
        <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
          {status === "live"
            ? "Your review is now live on our website. We really appreciate it!"
            : status === "sheet"
            ? "Your review has been received. It will appear on the website shortly."
            : "WhatsApp has opened with your review — tap Send to share it with us. Approved reviews are added to the website."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-white border border-border/70 p-6 sm:p-10 shadow-soft space-y-6">
      <div>
        <p id="rating-label" className="text-sm font-semibold text-foreground mb-2">
          Your rating <span className="text-muted-foreground">*</span>
        </p>
        <div role="radiogroup" aria-labelledby="rating-label" className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} star${n > 1 ? "s" : ""}`}
              onMouseEnter={() => setHover(n)}
              onClick={() => {
                setRating(n);
                setErrors((p) => ({ ...p, rating: "" }));
              }}
              className="p-1 -m-0.5"
            >
              <Star className={`w-8 h-8 transition-colors ${n <= (hover || rating) ? "fill-foreground text-foreground" : "text-foreground/20"}`} />
            </button>
          ))}
        </div>
        {errors.rating && <p className="mt-2 text-sm text-destructive">{errors.rating}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="rv-name" className="block text-sm font-semibold text-foreground mb-2">
            Name <span className="text-muted-foreground">*</span>
          </label>
          <input id="rv-name" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={`${fieldBase} h-12`} />
          {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="rv-service" className="block text-sm font-semibold text-foreground mb-2">
            Service <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <select id="rv-service" value={service} onChange={(e) => setService(e.target.value)} className={`${fieldBase} h-12`}>
            <option value="">Select…</option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="rv-text" className="block text-sm font-semibold text-foreground mb-2">
          Your review <span className="text-muted-foreground">*</span>
        </label>
        <textarea
          id="rv-text"
          rows={4}
          maxLength={500}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Tell others about your experience…"
          className={`${fieldBase} py-3 resize-none`}
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span className="text-destructive">{errors.text}</span>
          <span>{text.length}/500</span>
        </div>
      </div>

      {/* Honeypot (hidden from people, catches spam bots) */}
      <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      {status === "error" && <p className="text-sm text-destructive">{errorMsg}</p>}

      <Button type="submit" variant="hero" size="lg" className="w-full sm:w-auto" disabled={status === "sending"}>
        {status === "sending" ? "Posting…" : reviewsMode() === "whatsapp" ? "Send Review" : "Post Review"}
      </Button>
      <p className="text-xs text-muted-foreground">
        {reviewsMode() === "whatsapp" ? "Your review will be sent to us on WhatsApp." : "Your review will appear on the website straight away."}
      </p>
    </form>
  );
};
