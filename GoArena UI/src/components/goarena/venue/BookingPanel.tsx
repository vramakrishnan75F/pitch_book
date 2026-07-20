import type { Sport } from "../types";

// ─── BookingPanel ─────────────────────────────────────────────────────────────
// Sticky booking card (desktop sidebar) + bottom bar (mobile).
// Exposes onBookNow — parent handles navigation to slot selection.

export type BookingPanelProps = {
  pricePerHour: number;
  currency: string;
  rating: number;
  reviewCount: number;
  availableSports: Sport[];
  selectedSport: string;        // controlled from parent
  isAvailable: boolean;
  onSportChange: (sportId: string) => void;
  onBookNow: () => void;
  className?: string;
};

export function BookingPanel({
  pricePerHour,
  currency,
  rating,
  reviewCount,
  availableSports,
  selectedSport,
  isAvailable,
  onSportChange,
  onBookNow,
  className = "",
}: BookingPanelProps) {
  return (
    <div className={`bg-card border border-border rounded-2xl p-6 shadow-lg ${className}`}>
      {/* Price */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-black text-primary">{currency}{pricePerHour}</span>
        <span className="text-sm text-muted-foreground">/hour</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#FFC857" stroke="#FFC857" strokeWidth="1.5">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
        <span className="text-sm font-bold text-foreground">{rating.toFixed(1)}</span>
        <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
      </div>

      {/* Sport selector */}
      {availableSports.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-black text-foreground uppercase tracking-wider mb-2">Sport</p>
          <div className="flex flex-wrap gap-2">
            {availableSports.map((s) => (
              <button
                key={s.id}
                onClick={() => onSportChange(s.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all duration-200 ${
                  selectedSport === s.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={onBookNow}
        disabled={!isAvailable}
        className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 mb-4 ${
          isAvailable
            ? "bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.02] active:scale-95"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {isAvailable ? (
          <>
            Select Time Slot
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </>
        ) : (
          "Currently Unavailable"
        )}
      </button>

      {/* Trust signals */}
      <div className="space-y-2">
        {[
          { text: "Free cancellation up to 2 hours before" },
          { text: "Instant booking confirmation" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary shrink-0">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BookingPanelMobile ───────────────────────────────────────────────────────
// Sticky bottom bar for mobile. Same callbacks.

export type BookingPanelMobileProps = Pick<
  BookingPanelProps,
  "pricePerHour" | "currency" | "rating" | "reviewCount" | "isAvailable" | "onBookNow"
>;

export function BookingPanelMobile({
  pricePerHour,
  currency,
  rating,
  reviewCount,
  isAvailable,
  onBookNow,
}: BookingPanelMobileProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-5 py-4 flex items-center justify-between gap-4 z-40 lg:hidden">
      <div>
        <div className="text-lg font-black text-primary">
          {currency}{pricePerHour}
          <span className="text-xs text-muted-foreground font-medium">/hr</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFC857" stroke="#FFC857" strokeWidth="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span className="text-xs font-bold text-foreground">{rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>
      </div>
      <button
        onClick={onBookNow}
        disabled={!isAvailable}
        className={`font-bold px-8 py-3 rounded-xl transition-all duration-200 ${
          isAvailable
            ? "bg-primary text-primary-foreground hover:opacity-90"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {isAvailable ? "Book Now" : "Unavailable"}
      </button>
    </div>
  );
}
