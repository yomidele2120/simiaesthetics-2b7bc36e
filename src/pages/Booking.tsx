import { FormEvent, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";
import { CalendarDays, Clock, User, MessageSquare, Sparkles, Check, Send, Info, Upload } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { serviceGroups, findService, formatPrice, formatNaira, serviceLabel } from "@/data/services";
import { PAYMENT, paymentEnabled } from "@/config/payment";
import { PaymentStep } from "@/components/booking/PaymentStep";
import { buildBookingMessage, buildWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

// Links from the previous version of the site used these ids.
const legacyIds: Record<string, string> = {
  "extra-under-eyes": "addon-under-eye",
  "extra-wispy": "addon-wispy",
  "extra-removal": "addon-removal",
};

type Errors = Partial<Record<"service" | "name" | "date" | "time" | "receipt", string>>;

const MAX_RECEIPT_MB = 10;

const todayISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

/** Parses "YYYY-MM-DD" as a local date (avoids timezone shifts). */
const parseLocalDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const SELECT_ARROW =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23999' stroke-width='2'%3E%3Cpath d='m4 6 4 4 4-4'/%3E%3C/svg%3E\")";

const fieldBase =
  "w-full h-12 rounded-xl border bg-white px-4 text-base text-foreground placeholder:text-muted-foreground/70 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [serviceId, setServiceId] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [receiptShared, setReceiptShared] = useState(false);
  const payNow = paymentEnabled();

  // Pre-select a service when arriving from a "Book" button
  useEffect(() => {
    const raw = searchParams.get("service");
    const id = raw ? legacyIds[raw] ?? raw : "";
    if (findService(id)) setServiceId(id);
  }, [searchParams]);

  const service = findService(serviceId);
  const minDate = useMemo(todayISO, []);

  // Preview for image receipts; free the memory when replaced
  useEffect(() => {
    if (!receipt || !receipt.type.startsWith("image/")) {
      setReceiptPreview(null);
      return;
    }
    const url = URL.createObjectURL(receipt);
    setReceiptPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [receipt]);

  const amountDue = service ? (PAYMENT.depositAmount ?? service.amount) : 0;
  const amountLabel = service
    ? PAYMENT.depositAmount != null
      ? "Booking deposit"
      : service.from
        ? "Starting price"
        : "Service price"
    : "";

  const message = useMemo(() => {
    if (!service) return "";
    return buildBookingMessage({
      customerName: name || "—",
      service: serviceLabel(service),
      price: formatPrice(service),
      date: date ? format(parseLocalDate(date), "EEEE, d MMMM yyyy") : "—",
      time: time || "—",
      notes,
      amountPaid: payNow ? formatNaira(amountDue) : undefined,
    });
  }, [service, name, date, time, notes, payNow, amountDue]);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!service) e.service = "Please choose a service.";
    if (name.trim().length < 2) e.name = "Please enter your full name.";
    if (!date) e.date = "Please choose a date.";
    else if (date < minDate) e.date = "Please choose today or a future date.";
    if (!time) e.time = "Please choose a time.";
    if (payNow && !receipt) e.receipt = "Please upload your payment receipt.";
    return e;
  };

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      const first = document.querySelector<HTMLElement>(`[data-field="${Object.keys(e)[0]}"]`);
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const url = buildWhatsAppUrl(message);
    openWhatsApp(url); // called synchronously in the submit handler so mobile browsers allow it
    setSentUrl(url);
    window.scrollTo({ top: 0 });
  };

  const reset = () => {
    setSentUrl(null);
    setServiceId("");
    setName("");
    setDate("");
    setTime("");
    setNotes("");
    setErrors({});
    setReceipt(null);
    setReceiptShared(false);
  };

  const onReceiptChange = (file: File | undefined) => {
    if (!file) return;
    const okType = file.type.startsWith("image/") || file.type === "application/pdf";
    if (!okType) {
      setErrors((p) => ({ ...p, receipt: "Please upload an image (JPG/PNG) or PDF." }));
      return;
    }
    if (file.size > MAX_RECEIPT_MB * 1024 * 1024) {
      setErrors((p) => ({ ...p, receipt: `File is too large — maximum ${MAX_RECEIPT_MB}MB.` }));
      return;
    }
    setReceipt(file);
    setErrors((p) => ({ ...p, receipt: undefined }));
  };

  // Phones can share the receipt file straight into WhatsApp via the share menu
  const canShareReceipt =
    !!receipt && typeof navigator !== "undefined" && !!navigator.canShare && navigator.canShare({ files: [receipt] });

  const shareReceipt = async () => {
    if (!receipt) return;
    try {
      await navigator.share({ files: [receipt], title: "Payment receipt" });
      setReceiptShared(true);
    } catch {
      /* user closed the share menu */
    }
  };

  // ——— After submitting ———
  if (sentUrl) {
    return (
      <Layout>
        <section className="py-16 lg:py-28 bg-[#f6f6f6]">
          <div className="container mx-auto px-5 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-foreground flex items-center justify-center">
                <WhatsAppIcon className="w-10 h-10 text-background" />
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl text-foreground">
                {payNow ? "Two quick steps in WhatsApp" : "One last step — tap Send"}
              </h1>
              {!payNow ? (
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  WhatsApp has opened with your booking message ready. <strong className="text-foreground">Your booking is
                  not sent until you tap the Send button inside WhatsApp.</strong> We'll reply there to confirm your appointment.
                </p>
              ) : (
                <ol className="mt-8 space-y-4 text-left">
                  <li className="rounded-2xl bg-white border border-border p-5">
                    <p className="font-semibold text-foreground">1. Send your booking details</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      WhatsApp has opened with your booking message ready — <strong className="text-foreground">tap Send</strong>.
                    </p>
                  </li>
                  <li className="rounded-2xl bg-white border border-border p-5">
                    <p className="font-semibold text-foreground">2. Send your payment receipt</p>
                    {canShareReceipt ? (
                      <>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Tap the button, choose <strong className="text-foreground">WhatsApp</strong>, then pick the Simi Aesthetic chat
                          (it will be at the top of your chats) and send.
                        </p>
                        <Button variant="hero" className="mt-4 w-full" onClick={shareReceipt}>
                          {receiptShared ? <Check className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                          {receiptShared ? "Receipt shared — share again" : "Send receipt to WhatsApp"}
                        </Button>
                      </>
                    ) : (
                      <p className="mt-1 text-sm text-muted-foreground">
                        In the WhatsApp chat, tap the <strong className="text-foreground">📎 attach</strong> button and send the receipt
                        you uploaded{receipt ? <> (<span className="text-foreground">{receipt.name}</span>)</> : null}.
                      </p>
                    )}
                  </li>
                </ol>
              )}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild variant="whatsapp" size="lg">
                  <a href={sentUrl} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon /> Open WhatsApp again
                  </a>
                </Button>
                <Button variant="outline" size="lg" onClick={reset}>
                  Book another service
                </Button>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                Been here before?{" "}
                <a href="/reviews#write" className="font-semibold text-foreground underline underline-offset-4">Leave us a review</a>
              </p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <section className="pt-12 pb-10 lg:pt-16 lg:pb-14 bg-[#f6f6f6]">
        <div className="container mx-auto px-5 lg:px-8 text-center max-w-2xl">
          <span className="eyebrow">Book on WhatsApp</span>
          <h1 className="mt-4 font-heading text-4xl sm:text-5xl font-medium text-foreground">
            Book your <em className="text-primary">appointment</em>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Fill in the details below. Your booking request will open in WhatsApp, ready to send to Simi Aesthetic.
          </p>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="container mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="rounded-3xl bg-white border border-border/70 shadow-soft p-6 sm:p-10 space-y-8">
              {/* Service */}
              <div data-field="service">
                <label htmlFor="service" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Service <span className="text-primary">*</span>
                </label>
                <select
                  id="service"
                  value={serviceId}
                  onChange={(e) => {
                    setServiceId(e.target.value);
                    setErrors((p) => ({ ...p, service: undefined }));
                  }}
                  aria-invalid={!!errors.service}
                  style={{ backgroundImage: SELECT_ARROW }}
                  className={`${fieldBase} appearance-none bg-no-repeat bg-[right_1rem_center] pr-10 ${
                    errors.service ? "border-destructive" : "border-input"
                  } ${serviceId ? "" : "text-muted-foreground"}`}
                >
                  <option value="">Select a service…</option>
                  {serviceGroups.map((g) => (
                    <optgroup key={g.id} label={g.title}>
                      {g.services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {formatPrice(s)}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {errors.service && <p className="mt-2 text-sm text-destructive">{errors.service}</p>}
                {service && (
                  <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary px-4 py-3 text-sm">
                    <span className="text-secondary-foreground">{serviceLabel(service)}</span>
                    <span className="font-semibold text-primary">{formatPrice(service)}</span>
                  </div>
                )}
                {service?.category === "tattoos" && (
                  <p className="mt-2 text-xs text-muted-foreground">Tattoo prices vary depending on the size and design.</p>
                )}
              </div>

              {/* Name */}
              <div data-field="name">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <User className="w-4 h-4 text-primary" /> Full name <span className="text-primary">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  className={`${fieldBase} ${errors.name ? "border-destructive" : "border-input"}`}
                />
                {errors.name && <p className="mt-2 text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Date */}
              <div data-field="date">
                <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <CalendarDays className="w-4 h-4 text-primary" /> Preferred date <span className="text-primary">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                    setErrors((p) => ({ ...p, date: undefined }));
                  }}
                  aria-invalid={!!errors.date}
                  className={`${fieldBase} ${errors.date ? "border-destructive" : "border-input"} [&::-webkit-date-and-time-value]:text-left`}
                />
                {errors.date && <p className="mt-2 text-sm text-destructive">{errors.date}</p>}
              </div>

              {/* Time */}
              <div data-field="time">
                <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3" id="time-label">
                  <Clock className="w-4 h-4 text-primary" /> Preferred time <span className="text-primary">*</span>
                </p>
                <div role="radiogroup" aria-labelledby="time-label" className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => {
                    const active = time === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => {
                          setTime(slot);
                          setErrors((p) => ({ ...p, time: undefined }));
                        }}
                        className={`h-11 rounded-xl text-sm font-medium border transition-all ${
                          active
                            ? "bg-primary text-primary-foreground border-primary shadow-elegant"
                            : "bg-white text-foreground/80 border-input hover:border-primary/50"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {errors.time && <p className="mt-2 text-sm text-destructive">{errors.time}</p>}
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notes" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                  <MessageSquare className="w-4 h-4 text-primary" /> Additional notes{" "}
                  <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g. preferred lash style, tattoo idea or size, allergies…"
                  className={`${fieldBase} h-auto py-3 border-input resize-none`}
                />
              </div>

              {/* Payment by bank transfer */}
              {payNow && (
                <div className="border-t border-border pt-8">
                  <PaymentStep
                    amount={service ? amountDue : null}
                    amountLabel={amountLabel}
                    amountNote={
                      service?.from && PAYMENT.depositAmount == null
                        ? "Tattoo prices vary with size and design — this is the starting price; any balance is paid at your appointment."
                        : undefined
                    }
                    receipt={receipt}
                    receiptPreview={receiptPreview}
                    error={errors.receipt}
                    maxMb={MAX_RECEIPT_MB}
                    onReceipt={onReceiptChange}
                    onRemoveReceipt={() => setReceipt(null)}
                  />
                </div>
              )}

              {/* Important notice */}
              <div className="flex items-start gap-3 rounded-2xl border border-border bg-secondary px-4 py-4 text-sm text-foreground/80">
                <Info className="w-5 h-5 mt-0.5 shrink-0 text-foreground" />
                <p>
                  Tapping the button below opens WhatsApp with your booking message already written.{" "}
                  <strong className="text-foreground">You still need to tap Send in WhatsApp</strong> for us to receive it.
                  {payNow && " You'll then send your receipt in the same chat — we'll show you how."}
                </p>
              </div>

              <Button type="submit" variant="whatsapp" size="xl" className="w-full">
                <WhatsAppIcon /> Continue to WhatsApp
              </Button>
            </form>

            {/* Live summary */}
            <aside className="lg:sticky lg:top-28 h-fit space-y-4">
              <div className="rounded-3xl bg-[#0b0b0b] text-white p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Your booking</p>
                <dl className="mt-5 space-y-4 text-sm">
                  {[
                    ["Service", service ? serviceLabel(service) : "—"],
                    ["Price", service ? formatPrice(service) : "—"],
                    ["Date", date ? format(parseLocalDate(date), "EEE, d MMM yyyy") : "—"],
                    ["Time", time || "—"],
                    ...(payNow ? [["To pay", service ? formatNaira(amountDue) : "—"]] : []),
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 border-b border-white/10 pb-3 last:border-0">
                      <dt className="text-white/60">{k}</dt>
                      <dd className="text-right font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {message && (
                <div className="rounded-3xl border border-border/70 bg-secondary p-5">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    <Send className="w-3.5 h-3.5" /> Message preview
                  </p>
                  <div className="rounded-2xl rounded-tr-sm bg-white border border-border px-4 py-3 text-[0.8rem] leading-relaxed text-foreground whitespace-pre-line shadow-sm">
                    {message}
                  </div>
                </div>
              )}

              <ul className="space-y-2 text-sm text-muted-foreground px-1">
                <li className="flex gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> We'll confirm your slot on WhatsApp.</li>
                <li className="flex gap-2"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Works on Android, iPhone and desktop (WhatsApp Web).</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
