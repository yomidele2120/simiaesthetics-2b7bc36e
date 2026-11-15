import { useState } from "react";
import { Check, Copy, Upload, X, ShieldCheck } from "lucide-react";
import { PAYMENT } from "@/config/payment";
import { formatNaira } from "@/data/services";

interface PaymentStepProps {
  amount: number | null;
  amountLabel: string;
  amountNote?: string;
  receipt: File | null;
  receiptPreview: string | null;
  error?: string;
  maxMb: number;
  onReceipt: (file: File | undefined) => void;
  onRemoveReceipt: () => void;
}

/** "1234567890" → "123 456 7890" for easier reading */
const groupDigits = (n: string) => n.replace(/^(\d{3})(\d{3})(\d+)$/, "$1 $2 $3");

const CopyButton = ({ value, label }: { value: string; label: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          /* clipboard blocked — the value is still visible */
        }
      }}
      aria-label={`Copy ${label}`}
      className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const StepBadge = ({ n, done }: { n: number; done?: boolean }) => (
  <span
    className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
      done ? "bg-foreground text-background" : "border border-foreground/30 text-foreground"
    }`}
  >
    {done ? <Check className="w-3.5 h-3.5" /> : n}
  </span>
);

export const PaymentStep = ({
  amount,
  amountLabel,
  amountNote,
  receipt,
  receiptPreview,
  error,
  maxMb,
  onReceipt,
  onRemoveReceipt,
}: PaymentStepProps) => (
  <div data-field="receipt" className="space-y-6">
    <div>
      <h3 className="font-heading text-2xl text-foreground">Payment</h3>
      <p className="mt-1 text-sm text-muted-foreground">Pay by bank transfer to secure your appointment — no card needed.</p>
    </div>

    {/* Step 1 — Transfer */}
    <div>
      <div className="flex items-center gap-3">
        <StepBadge n={1} />
        <p className="text-sm font-semibold text-foreground">Transfer to this account</p>
      </div>
      <div>

        <div className="mt-3 relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0b0b0b,#2b2b2b)] text-white p-5 sm:p-6 shadow-elegant">
          {/* subtle card sheen */}
          <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-white/[0.06]" />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-10 h-44 w-44 rounded-full bg-white/[0.04]" />

          <div className="relative flex items-center justify-between">
            <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{PAYMENT.bankName}</span>
            <span className="whitespace-nowrap text-[0.6rem] uppercase tracking-[0.18em] text-white/50">Bank transfer</span>
          </div>

          <div className="relative mt-6">
            <p className="whitespace-nowrap text-[0.6rem] uppercase tracking-[0.18em] text-white/50">Account number</p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <span className="whitespace-nowrap font-heading text-[1.7rem] sm:text-3xl tracking-[0.06em] tabular-nums">
                {groupDigits(PAYMENT.accountNumber)}
              </span>
              <CopyButton value={PAYMENT.accountNumber} label="account number" />
            </div>
          </div>

          <div className="relative mt-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
            <div>
              <p className="whitespace-nowrap text-[0.6rem] uppercase tracking-[0.18em] text-white/50">Account name</p>
              <p className="mt-1 font-medium">{PAYMENT.accountName}</p>
            </div>
            <div className="text-right ml-auto">
              <p className="whitespace-nowrap text-[0.6rem] uppercase tracking-[0.18em] text-white/50">{amountLabel || "Amount"}</p>
              <p className="mt-1 font-heading text-2xl">{amount != null ? formatNaira(amount) : "—"}</p>
            </div>
          </div>
        </div>

        {amount == null ? (
          <p className="mt-3 text-xs text-muted-foreground">Choose a service above to see the amount to pay.</p>
        ) : (
          amountNote && <p className="mt-3 text-xs text-muted-foreground">{amountNote}</p>
        )}
      </div>
    </div>

    {/* Step 2 — Upload receipt */}
    <div>
      <div className="flex items-center gap-3">
        <StepBadge n={2} done={!!receipt} />
        <p className="text-sm font-semibold text-foreground">
          Upload your payment receipt <span className="text-muted-foreground">*</span>
        </p>
      </div>
      <div>
        <div className="mt-3">
          {receipt ? (
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3">
              {receiptPreview ? (
                <img src={receiptPreview} alt="Receipt preview" className="w-14 h-14 rounded-xl object-cover border border-border" />
              ) : (
                <span className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center text-xs font-bold">PDF</span>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{receipt.name}</p>
                <p className="text-xs text-muted-foreground">
                  {Math.max(0.1, receipt.size / 1024 / 1024).toFixed(1)} MB · ready to send
                </p>
              </div>
              <button type="button" onClick={onRemoveReceipt} aria-label="Remove receipt" className="p-2 rounded-full hover:bg-secondary">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label
              className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed bg-white px-4 py-8 text-center cursor-pointer transition-colors hover:border-foreground/50 hover:bg-secondary/50 ${
                error ? "border-destructive" : "border-input"
              }`}
            >
              <span className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
                <Upload className="w-5 h-5 text-foreground" />
              </span>
              <span className="text-sm font-semibold text-foreground">Tap to upload screenshot or PDF</span>
              <span className="text-xs text-muted-foreground">JPG, PNG or PDF · max {maxMb}MB</span>
              <input
                type="file"
                accept="image/*,application/pdf"
                className="sr-only"
                onChange={(e) => {
                  onReceipt(e.target.files?.[0]);
                  e.target.value = ""; // allow re-selecting the same file
                }}
              />
            </label>
          )}
          {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
        </div>
      </div>
    </div>

    <p className="flex items-start gap-2 text-xs text-muted-foreground">
      <ShieldCheck className="w-4 h-4 shrink-0 text-foreground/70" />
      Only pay into the account above, in the name {PAYMENT.accountName}. Your receipt is sent only to Simi on WhatsApp
      — it isn't stored on this website.
    </p>
  </div>
);
