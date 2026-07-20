import { useState } from "react";

// ─── VenueGallery ─────────────────────────────────────────────────────────────
// Image carousel for the venue detail page.
// All images provided as props. No data fetching.

export type VenueGalleryProps = {
  images: string[];      // ordered list of image URLs
  venueName: string;     // used for alt text
  badgeLabel?: string;
  isFavourited: boolean;
  onFavouriteToggle: () => void;
  className?: string;
};

export function VenueGallery({
  images,
  venueName,
  badgeLabel,
  isFavourited,
  onFavouriteToggle,
  className = "",
}: VenueGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setActiveIndex((i) => (i + 1) % images.length);

  return (
    <div className={className}>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden h-72 md:h-[420px] bg-muted group">
        <img
          src={images[activeIndex]}
          alt={`${venueName} — photo ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

        {/* Chevron buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-card transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-card transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to photo ${i + 1}`}
                className={`rounded-full transition-all duration-200 ${
                  i === activeIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        )}

        {/* Top overlays */}
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          {badgeLabel ? (
            <span className="bg-card/95 text-primary text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm">
              {badgeLabel}
            </span>
          ) : <span />}

          <button
            onClick={onFavouriteToggle}
            aria-label={isFavourited ? "Remove from favourites" : "Save venue"}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md transition-all duration-200 hover:scale-110 ${
              isFavourited ? "bg-destructive text-destructive-foreground" : "bg-card/90 text-foreground"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isFavourited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1}`}
              className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex ? "border-primary" : "border-transparent opacity-55 hover:opacity-90"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
