import type { Amenity } from "../types";

// ─── VenueAmenities ───────────────────────────────────────────────────────────
// Grid of amenity chips. Used inside the Amenities tab on the Venue Detail page.

export type VenueAmenitiesProps = {
  amenities: Amenity[];
  className?: string;
};

export function VenueAmenities({ amenities, className = "" }: VenueAmenitiesProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 ${className}`}>
      {amenities.map((a) => (
        <div
          key={a.id}
          className="flex items-center gap-2.5 bg-card border border-border rounded-xl p-3"
        >
          <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center shrink-0">
            {a.icon ?? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </div>
          <span className="text-sm font-semibold text-foreground">{a.label}</span>
        </div>
      ))}
    </div>
  );
}
