import { useState } from "react";

// ─── CouponInput ──────────────────────────────────────────────────────────────
// Coupon/promo code field.
// onApplyCoupon — parent validates and returns error or applied discount.
// onRemoveCoupon — parent clears the applied coupon.

export type CouponInputProps = {
  appliedCoupon: string | null;     // null = none applied
  discountPercent: number;          // shown when appliedCoupon is set
  errorMessage?: string;
  hint?: string;                    // e.g. "Try PLAY10 or ARENA20"
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  className?: string;
};

export function CouponInput({
  appliedCoupon,
  discountPercent,
  errorMessage,
  hint,
  onApplyCoupon,
  onRemoveCoupon,
  className = "",
}: CouponInputProps) {
  const [code, setCode] = useState("");

  const handleApply = () => {
    if (code.trim()) {
      onApplyCoupon(code.trim().toUpperCase());
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
        <h3 className="text-sm font-black text-foreground">Coupon / Promo Code</h3>
      </div>

      {appliedCoupon ? (
        <div className="flex items-center justify-between bg-secondary border border-primary/20 rounded-xl px-4 py-3">
          <div>
            <div className="text-xs font-black text-primary">{appliedCoupon}</div>
            <div className="text-xs text-muted-foreground">{discountPercent}% discount applied</div>
          </div>
          <button
            onClick={onRemoveCoupon}
            className="text-xs font-bold text-destructive hover:opacity-80 transition-opacity"
          >
            Remove
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="Enter code (e.g. PLAY10)"
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
            />
            <button
              onClick={handleApply}
              disabled={!code.trim()}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:opacity-90 disabled:opacity-50 transition-all"
            >
              Apply
            </button>
          </div>
          {errorMessage && (
            <p className="text-xs text-destructive mt-2 font-semibold">{errorMessage}</p>
          )}
          {hint && !errorMessage && (
            <p className="text-xs text-muted-foreground mt-2">{hint}</p>
          )}
        </>
      )}
    </div>
  );
}
