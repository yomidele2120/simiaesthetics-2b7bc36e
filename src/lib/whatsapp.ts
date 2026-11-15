import { BUSINESS } from "@/config/business";

export interface BookingDetails {
  customerName: string;
  service: string;
  price: string;
  date: string;
  time: string;
  notes?: string;
}

/** Builds the WhatsApp Click-to-Chat URL for a business number + message. */
export const buildWhatsAppUrl = (message?: string, number: string = BUSINESS.whatsappNumber) => {
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
};

/** Formats the booking message exactly as agreed with the business owner. */
export const buildBookingMessage = (b: BookingDetails) =>
  [
    "Hello, I would like to book an appointment.",
    "",
    `Customer Name: ${b.customerName.trim()}`,
    `Service: ${b.service}`,
    `Price: ${b.price}`,
    `Preferred Date: ${b.date}`,
    `Preferred Time: ${b.time}`,
    `Additional Notes: ${b.notes?.trim() ? b.notes.trim() : "None"}`,
    "",
    "Please confirm my appointment. Thank you.",
  ].join("\n");

/**
 * Opens WhatsApp. On phones wa.me hands over to the WhatsApp app; on desktop
 * it opens WhatsApp Web / Desktop. Must be called directly inside a click or
 * submit handler so mobile browsers don't block the new tab.
 */
export const openWhatsApp = (url: string) => {
  // Note: passing "noopener" as a feature makes window.open return null in
  // modern browsers, so we detach the opener manually instead.
  const win = window.open(url, "_blank");
  if (win) {
    win.opener = null;
  } else {
    // Popup blocked (common on some in-app browsers) — navigate in place instead.
    window.location.href = url;
  }
};
