/**
 * Bank transfer details shown on the booking page.
 * No payment gateway — customers transfer to this account, then upload
 * their receipt, which they send to Simi's WhatsApp with their booking.
 *
 * If accountNumber is ever emptied, the payment step is hidden and bookings
 * work as details-only.
 */
export const PAYMENT = {
  bankName: "Access Bank",
  accountNumber: "1232802006",
  accountName: "Orunesajo Simisola",

  /**
   * How much the customer pays to secure the booking:
   *  - null  → the full service price (for "From" prices such as tattoos, the starting price)
   *  - a number (e.g. 5000) → a fixed booking deposit in naira for every service
   */
  depositAmount: null as number | null,
};

export const paymentEnabled = () => Boolean(PAYMENT.accountNumber.trim());
