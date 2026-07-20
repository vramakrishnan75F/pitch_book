// ─── PriceBreakdown ───────────────────────────────────────────────────────────
// Itemized price table used in Slot Selection, Booking Summary, and Payment.

export type PriceRow = {
  label: string;
  amount: number;
  isDiscount?: boolean;   // shown in green/accent color
};

export type PriceBreakdownProps = {
  currency: string;
  rows: PriceRow[];
  total: number;
  className?: string;
};

export function PriceBreakdown({ currency, rows, total, className = "" }: PriceBreakdownProps) {
  return (
    <div className={className}>
      <div className="space-y-3 text-sm">
        {rows.map((row, i) => (
          <div key={i} className="flex justify-between">
            <span className={row.isDiscount ? "text-primary font-semibold" : "text-muted-foreground"}>
              {row.label}
            </span>
            <span className={`font-semibold ${row.isDiscount ? "text-primary" : "text-foreground"}`}>
              {row.isDiscount ? "-" : ""}{currency}{Math.abs(row.amount)}
            </span>
          </div>
        ))}
        <div className="flex justify-between font-black text-foreground text-base border-t border-border pt-3 mt-1">
          <span>Total</span>
          <span className="text-primary">{currency}{total}</span>
        </div>
      </div>
    </div>
  );
}
