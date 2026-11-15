/**
 * Reviews — powered by a Google Form + Google Sheet (no backend needed).
 * Full setup steps: see REVIEWS_SETUP.md in the project root.
 *
 * Fill these in once (or set the matching VITE_ variables in Vercel).
 * Until FORM_ACTION_URL is set, submitted reviews are sent to WhatsApp instead,
 * so the review form still works while you set things up.
 */
const env = import.meta.env;

export const REVIEWS_CONFIG = {
  /** e.g. https://docs.google.com/forms/d/e/1FAIpQL.../formResponse */
  formActionUrl: env.VITE_REVIEWS_FORM_URL || "",

  /** The "entry.123456789" IDs of each Google Form question. */
  fields: {
    name: env.VITE_REVIEWS_FIELD_NAME || "",
    service: env.VITE_REVIEWS_FIELD_SERVICE || "",
    rating: env.VITE_REVIEWS_FIELD_RATING || "",
    review: env.VITE_REVIEWS_FIELD_REVIEW || "",
  },

  /** Sheet published to the web as CSV, e.g. https://docs.google.com/spreadsheets/d/e/2PACX.../pub?gid=0&single=true&output=csv */
  sheetCsvUrl: env.VITE_REVIEWS_SHEET_CSV || "",
};

export const reviewsFormConfigured = () =>
  Boolean(REVIEWS_CONFIG.formActionUrl && Object.values(REVIEWS_CONFIG.fields).every(Boolean));
