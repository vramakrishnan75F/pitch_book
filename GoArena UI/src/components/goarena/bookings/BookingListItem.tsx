import type { BookingListItem as BookingListItemType } from "../types";

// ─── BookingListItem ──────────────────────────────────────────────────────────
// Single booking card used in My Bookings screen.
// All actions exposed as callbacks.

const STATUS_CONFIG = {
  upcoming: { label: "Upcoming", color: "text-primary", bg: "bg-secondary" },
  completed: { label: "Completed", color: "text-muted-foreground", bg: "bg-muted" },
  cancelled: { label: "Cancelled", color: "text-destructive", bg: "bg-destructive/10" },
} as const;

export type BookingListItemProps = {
  booking: BookingListItemType;
  onRebook?: (bookingId: string) => void;
  onCancel?: (bookingId: string) => void;
  onDownloadInvoice?: (bookingId: string) => void;
  className?: string;
};

export function BookingListItem({
  booking,
  onRebook,
  onCancel,
  onDownloadInvoice,
  className = "",
}: BookingListItemProps) {
  const status = STATUS_CONFIG[booking.status];

  return (
    <article className={`bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex">
        {/* Venue image */}
        <div className="w-32 sm:w-40 shrink-0 bg-muted">
          <img src={booking.venueImageUrl} alt={booking.venueName} className="w-full h-full object-cover" />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-bold text-foreground text-[15px] leading-tight mb-0.5">{booking.venueName}</h3>
              <p className="text-xs text-muted-foreground">{booking.venueLocation}</p>
            </div>
            <span className={`shrink-0 text-[10px] font-black px-2.5 py-1 rounded-full ${status.bg} ${status.color}`}>
              {status.label}
            </span>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
            <span>{booking.sportIcon} {booking.sport}</span>
            <span>{booking.date}</span>
            <span>{booking.time} · {booking.duration}h</span>
          </div>

          {/* Amount + actions */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">Paid</div>
              <div className="text-sm font-black text-primary">{booking.currency}{booking.total}</div>
            </div>
            <div className="flex gap-2">
              {booking.status === "upcoming" && onCancel && (
                <button
                  onClick={() => onCancel(booking.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-destructive border border-destructive/30 rounded-lg hover:bg-destructive/5 transition-colors"
                >
                  Cancel
                </button>
              )}
              {booking.status === "completed" && onRebook && (
                <button
                  onClick={() => onRebook(booking.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary border border-primary/30 rounded-lg hover:bg-secondary transition-colors"
                >
                  Rebook
                </button>
              )}
              {onDownloadInvoice && (
                <button
                  onClick={() => onDownloadInvoice(booking.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-muted-foreground border border-border rounded-lg hover:border-foreground/30 transition-colors"
                >
                  Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking ID footer */}
      <div className="px-4 py-2 bg-muted/40 border-t border-border">
        <span className="text-[10px] text-muted-foreground font-semibold">Booking ID: {booking.id}</span>
      </div>
    </article>
  );
}
