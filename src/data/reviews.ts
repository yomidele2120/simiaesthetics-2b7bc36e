import type { Review } from "@/lib/reviews";

/**
 * Approved client reviews shown on the website.
 *
 * How it works (no Google account or backend needed):
 * 1. A client writes a review on the website → it arrives on Simi's WhatsApp.
 * 2. If Simi approves it, copy it into this list (newest first) and redeploy.
 *
 * Only add real reviews from real clients, exactly as they wrote them.
 *
 * Example entry:
 *   { name: "Client's name", service: "Cluster Lashes", rating: 5, text: "Their review…", date: "2026-11-15" },
 */
export const approvedReviews: Review[] = [];
