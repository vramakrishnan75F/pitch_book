// ─── Skeletons ────────────────────────────────────────────────────────────────
// Loading placeholder components. Use while parent is fetching data.
// No props, no callbacks — purely visual.

function Pulse({ className }: { className: string }) {
  return <div className={`bg-muted animate-pulse rounded-xl ${className}`} />;
}

/** Venue card skeleton — matches VenueCard dimensions */
export function VenueCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-card rounded-2xl overflow-hidden border border-border ${className}`}>
      <Pulse className="h-48 rounded-none" />
      <div className="p-4 space-y-3">
        <Pulse className="h-4 w-3/4" />
        <Pulse className="h-3 w-1/2" />
        <div className="flex justify-between">
          <Pulse className="h-3 w-16" />
          <Pulse className="h-3 w-12" />
        </div>
        <div className="flex gap-2">
          <Pulse className="h-5 w-16 rounded-full" />
          <Pulse className="h-5 w-14 rounded-full" />
        </div>
        <Pulse className="h-10 rounded-xl" />
      </div>
    </div>
  );
}

/** Grid of venue card skeletons */
export function VenueCardGridSkeleton({ count = 4, className = "" }: { count?: number; className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <VenueCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Booking list item skeleton */
export function BookingListItemSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-2xl overflow-hidden ${className}`}>
      <div className="flex">
        <Pulse className="w-32 h-28 rounded-none shrink-0" />
        <div className="flex-1 p-4 space-y-3">
          <Pulse className="h-4 w-3/4" />
          <Pulse className="h-3 w-1/2" />
          <div className="flex gap-4">
            <Pulse className="h-3 w-20" />
            <Pulse className="h-3 w-20" />
          </div>
          <div className="flex justify-between items-center">
            <Pulse className="h-5 w-16" />
            <div className="flex gap-2">
              <Pulse className="h-8 w-20 rounded-lg" />
              <Pulse className="h-8 w-20 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Venue detail page skeleton */
export function VenueDetailSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-6 ${className}`}>
      <Pulse className="h-72 md:h-[420px] rounded-2xl" />
      <div className="space-y-3">
        <Pulse className="h-8 w-2/3" />
        <Pulse className="h-4 w-1/2" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => <Pulse key={i} className="h-20 rounded-xl" />)}
      </div>
      <div className="space-y-2">
        <Pulse className="h-4 w-full" />
        <Pulse className="h-4 w-5/6" />
        <Pulse className="h-4 w-4/6" />
      </div>
    </div>
  );
}

/** Profile skeleton */
export function ProfileSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-4">
          <Pulse className="w-16 h-16 rounded-2xl" />
          <div className="space-y-2">
            <Pulse className="h-5 w-32" />
            <Pulse className="h-3 w-24" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => <Pulse key={i} className="h-16 rounded-xl" />)}
        </div>
      </div>
      <Pulse className="h-40 rounded-2xl" />
      <Pulse className="h-48 rounded-2xl" />
    </div>
  );
}
