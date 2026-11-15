import { Layout } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { useSearchParams } from "react-router-dom";
import { ReviewCard, ReviewForm, Stars, useReviewsState } from "@/components/reviews/Reviews";
import { deleteReview } from "@/lib/reviews";

const Reviews = () => {
  const { reviews, refresh } = useReviewsState();
  // Simi's private moderation link: /reviews?admin=YOUR_ADMIN_KEY
  const [params] = useSearchParams();
  const adminKey = params.get("admin") || "";

  const remove = async (id: string, name: string) => {
    if (!window.confirm(`Delete the review from ${name}? This can't be undone.`)) return;
    try {
      await deleteReview(id, adminKey);
      refresh();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : "Couldn't delete the review.");
    }
  };
  const avg = reviews && reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <Layout>
      <section className="py-14 lg:py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-5 lg:px-8 text-center max-w-2xl">
          <span className="eyebrow">Client Reviews</span>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground">
            Kind words from <em>our clients</em>
          </h1>
          {reviews && reviews.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white border border-border px-5 py-2.5">
              <Stars value={Math.round(avg)} />
              <span className="text-sm font-semibold text-foreground">{avg.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">
                from {reviews.length} review{reviews.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container mx-auto px-5 lg:px-8">
          {reviews === null ? (
            <p className="text-center text-muted-foreground">Loading reviews…</p>
          ) : reviews.length === 0 ? (
            <p className="text-center text-muted-foreground">No reviews yet — be the first to share your experience.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((r, i) => (
                <Reveal key={r.id ?? `${r.name}-${i}`} delay={(i % 3) * 80}>
                  <ReviewCard review={r} onDelete={adminKey && r.id ? () => remove(r.id!, r.name) : undefined} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="write" className="scroll-mt-24 py-14 lg:py-20 bg-[#f6f6f6]">
        <div className="container mx-auto px-5 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <span className="eyebrow">Write a Review</span>
            <h2 className="section-title mt-4">How was your visit?</h2>
            <p className="mt-3 text-muted-foreground">Your feedback helps us grow and helps others choose with confidence.</p>
          </div>
          <ReviewForm onPosted={refresh} />
        </div>
      </section>
    </Layout>
  );
};

export default Reviews;
