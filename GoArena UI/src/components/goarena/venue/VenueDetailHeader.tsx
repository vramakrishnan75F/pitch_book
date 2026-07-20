import type { VenueDetail } from "../types";

// ─── VenueDetailHeader ────────────────────────────────────────────────────────
// Name, sport, type, location, rating row for the venue detail page.

export type VenueDetailHeaderProps = {
  venue: Pick<VenueDetail, "name" | "address" | "sports" | "sportIcon" | "type" | "rating" | "reviewCount" | "distanceLabel" | "pricePerHour" | "currency" | "isAvailable">;
};

export function VenueDetailHeader({ venue }: VenueDetailHeaderProps) {
  return (
    <div>
      {/* Sport + type tags */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{venue.sportIcon}</span>
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {venue.sports.join(" · ")}
        </span>
        <span className="text-xs text-muted-foreground">·</span>
        <span className="text-xs font-bold text-muted-foreground">{venue.type}</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2 leading-tight">
            {venue.name}
          </h1>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{venue.address}</span>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="flex items-center gap-1 justify-end mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFC857" stroke="#FFC857" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-lg font-black text-foreground">{venue.rating.toFixed(1)}</span>
          </div>
          <div className="text-xs text-muted-foreground">{venue.reviewCount} reviews</div>
        </div>
      </div>

      {/* Quick stat chips */}
      <div className="grid grid-cols-3 gap-3 mt-5">
        {[
          { label: "Distance", value: venue.distanceLabel },
          { label: "Price/hr", value: `${venue.currency}${venue.pricePerHour}` },
          { label: "Status", value: venue.isAvailable ? "Open Now" : "Booked Out" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-3 text-center">
            <div className="text-sm font-black text-foreground mb-0.5">{stat.value}</div>
            <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
