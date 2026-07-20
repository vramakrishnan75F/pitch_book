import type { VenueSummary } from "../types";

// ─── VenueCard ────────────────────────────────────────────────────────────────
// Presentational card for search results, landing page grids, and carousels.
// No navigation — parent handles routing via onVenueClick / onFavouriteToggle.

export type VenueCardProps = {
  venue: VenueSummary;
  /** Called when user clicks anywhere on the card or the Book Now button */
  onVenueClick: (venueId: string) => void;
  /** Called when user taps the heart icon */
  onFavouriteToggle: (venueId: string) => void;
  /** Compact layout for horizontal carousels */
  variant?: "default" | "compact";
  className?: string;
};

export function VenueCard({
  venue,
  onVenueClick,
  onFavouriteToggle,
  variant = "default",
  className = "",
}: VenueCardProps) {
  const isCompact = variant === "compact";

  return (
    <article
      className={`group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer ${className}`}
      onClick={() => onVenueClick(venue.id)}
      aria-label={`${venue.name} — ${venue.location}`}
    >
      {/* Image */}
      <div className={`relative bg-muted overflow-hidden ${isCompact ? "h-36" : "h-48"}`}>
        <img
          src={venue.imageUrl}
          alt={venue.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top row: badge + favourite */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
          <div className="flex gap-2">
            {venue.badgeLabel && (
              <span className="bg-card/95 backdrop-blur-sm text-primary text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                {venue.badgeLabel}
              </span>
            )}
            <span className="bg-card/95 backdrop-blur-sm text-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              {venue.type}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onFavouriteToggle(venue.id); }}
            aria-label={venue.isFavourited ? "Remove from favourites" : "Add to favourites"}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm shadow-sm transition-all duration-200 hover:scale-110 ${
              venue.isFavourited ? "bg-destructive text-destructive-foreground" : "bg-card/90 text-foreground"
            }`}
          >
            {/* Replace with your Icon component */}
            <svg width="13" height="13" viewBox="0 0 24 24" fill={venue.isFavourited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        {/* Availability badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
              venue.isAvailable
                ? "bg-[color:var(--color-success,#16A34A)]/90 text-white"
                : "bg-foreground/55 text-white"
            }`}
          >
            {venue.isAvailable ? "Slots Available" : "Fully Booked"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-card-foreground text-[15px] leading-tight line-clamp-1">
            {venue.name}
          </h3>
          <span className="text-base shrink-0 leading-none mt-0.5">{venue.sportIcon}</span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
          {/* Map pin icon */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="truncate">{venue.location}</span>
          <span className="ml-auto font-semibold shrink-0">{venue.distanceLabel}</span>
        </div>

        {/* Rating + Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#FFC857" stroke="#FFC857" strokeWidth="1.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-sm font-bold text-card-foreground">{venue.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({venue.reviewCount})</span>
          </div>
          <div>
            <span className="text-sm font-black text-primary">{venue.currency}{venue.pricePerHour}</span>
            <span className="text-xs text-muted-foreground">/hr</span>
          </div>
        </div>

        {/* Amenity chips */}
        {!isCompact && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {venue.amenityLabels.slice(0, 2).map((a) => (
              <span key={a} className="text-[10px] font-bold bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                {a}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={(e) => { e.stopPropagation(); onVenueClick(venue.id); }}
          disabled={!venue.isAvailable}
          className={`w-full text-sm font-bold py-2.5 rounded-xl transition-all duration-200 ${
            venue.isAvailable
              ? "bg-primary text-primary-foreground hover:opacity-90 hover:scale-[1.02] active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {venue.isAvailable ? "Book Now" : "Fully Booked"}
        </button>
      </div>
    </article>
  );
}
