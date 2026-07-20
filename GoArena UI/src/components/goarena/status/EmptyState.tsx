import type { ReactNode } from "react";

// ─── EmptyState ───────────────────────────────────────────────────────────────
// Generic reusable empty/error state. Used for:
//   NoSearchResults, NoSlotsAvailable, EmptyBookings,
//   Offline, BookingExpired, PaymentFailed, PaymentCancelled
//
// Pass variant-specific content via props.

export type EmptyStateProps = {
  illustration: ReactNode;        // emoji string or custom SVG/img
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
};

export function EmptyState({
  illustration,
  title,
  description,
  primaryAction,
  secondaryAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`py-20 flex flex-col items-center text-center ${className}`}>
      <div className="text-6xl mb-5 select-none">{illustration}</div>
      <h3 className="text-xl font-black text-foreground mb-2">{title}</h3>
      {description && (
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-xs">{description}</p>
      )}
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="bg-primary text-primary-foreground font-bold px-7 py-3 rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-105"
            >
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="border border-border text-foreground font-bold px-7 py-3 rounded-xl hover:border-foreground/30 transition-all duration-200"
            >
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Preset variants ──────────────────────────────────────────────────────────
// Ready-to-use wrappers so you don't repeat the same strings everywhere.

export type PresetProps = {
  onPrimary: () => void;
  onSecondary?: () => void;
  className?: string;
};

export function NoSearchResults({ onPrimary, className }: PresetProps) {
  return (
    <EmptyState
      illustration="🔍"
      title="No venues found"
      description="Try adjusting your filters or searching in a different area."
      primaryAction={{ label: "Clear Filters", onClick: onPrimary }}
      className={className}
    />
  );
}

export function NoSlotsAvailable({ onPrimary, onSecondary, className }: PresetProps) {
  return (
    <EmptyState
      illustration="📅"
      title="No slots available"
      description="All slots for this date are booked. Try a different date or time."
      primaryAction={{ label: "Try Another Date", onClick: onPrimary }}
      secondaryAction={onSecondary ? { label: "Browse Other Venues", onClick: onSecondary } : undefined}
      className={className}
    />
  );
}

export function EmptyBookings({ onPrimary, className }: PresetProps) {
  return (
    <EmptyState
      illustration="🏟️"
      title="No bookings yet"
      description="You haven't booked any venues. Find a venue and secure your slot!"
      primaryAction={{ label: "Find a Venue", onClick: onPrimary }}
      className={className}
    />
  );
}

export function OfflineScreen({ onPrimary, className }: PresetProps) {
  return (
    <EmptyState
      illustration="📶"
      title="You're offline"
      description="Check your internet connection and try again."
      primaryAction={{ label: "Retry", onClick: onPrimary }}
      className={className}
    />
  );
}

export function BookingExpiredScreen({ onPrimary, onSecondary, className }: PresetProps) {
  return (
    <EmptyState
      illustration="⏰"
      title="Booking session expired"
      description="Your slot reservation has timed out. Please start a new booking."
      primaryAction={{ label: "Select a New Slot", onClick: onPrimary }}
      secondaryAction={onSecondary ? { label: "Go Home", onClick: onSecondary } : undefined}
      className={className}
    />
  );
}
