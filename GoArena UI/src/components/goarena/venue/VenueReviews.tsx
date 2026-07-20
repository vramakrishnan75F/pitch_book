import type { Review } from "../types";

// ─── VenueReviews ─────────────────────────────────────────────────────────────
// Rating summary + individual review cards for the Reviews tab.

export type VenueReviewsProps = {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  className?: string;
};

function StarRow({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#FFC857" : "none"}
          stroke={i < Math.round(rating) ? "#FFC857" : "currentColor"}
          strokeWidth="1.5" className={i < Math.round(rating) ? "" : "text-muted-foreground"}>
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export function VenueReviews({ reviews, averageRating, totalReviews, className = "" }: VenueReviewsProps) {
  const distribution = [5, 4, 3, 2, 1].map((n) => ({
    star: n,
    pct: Math.round((reviews.filter((r) => Math.round(r.rating) === n).length / Math.max(reviews.length, 1)) * 100),
  }));

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Rating summary */}
      <div className="flex items-center gap-6 bg-card border border-border rounded-xl p-4">
        <div className="text-center shrink-0">
          <div className="text-4xl font-black text-foreground">{averageRating.toFixed(1)}</div>
          <StarRow rating={averageRating} />
          <div className="text-xs text-muted-foreground mt-1">{totalReviews} reviews</div>
        </div>
        <div className="flex-1 space-y-1.5">
          {distribution.map(({ star, pct }) => (
            <div key={star} className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground w-3 text-right">{star}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#FFC857" stroke="#FFC857" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-[#FFC857] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[10px] text-muted-foreground w-7 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual reviews */}
      {reviews.map((review) => (
        <div key={review.id} className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            {/* Avatar: image URL or initials fallback */}
            {review.authorAvatar?.startsWith("http") ? (
              <img src={review.authorAvatar} alt={review.authorName} className="w-8 h-8 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-[10px] font-black shrink-0">
                {review.authorAvatar ?? review.authorName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <div className="text-sm font-bold text-foreground">{review.authorName}</div>
              <div className="text-xs text-muted-foreground">{review.date}</div>
            </div>
            <StarRow rating={review.rating} />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
