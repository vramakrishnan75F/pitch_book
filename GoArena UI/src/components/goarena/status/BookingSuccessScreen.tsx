import { useEffect, useState } from "react";
import type { BookingDetails } from "../types";

// ─── BookingSuccessScreen ─────────────────────────────────────────────────────
// Full-page booking confirmation screen with confetti animation.
// All actions exposed as callbacks — parent handles navigation/downloads.

export type BookingSuccessScreenProps = {
  booking: BookingDetails;
  onViewBookings: () => void;
  onBookAgain: () => void;
  onGetDirections: () => void;
  onAddToCalendar: () => void;
  onShare: () => void;
  onDownloadReceipt: () => void;
};

function Confetti() {
  const [items] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      color: ["#32C766", "#0F7B45", "#FFC857", "#15202B", "#a3e635"][i % 5],
      size: 6 + Math.random() * 8,
    }))
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {items.map((item) => (
        <div
          key={item.id}
          className="absolute top-0 animate-bounce"
          style={{
            left: `${item.x}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${1.5 + Math.random()}s`,
            width: item.size,
            height: item.size,
            backgroundColor: item.color,
            borderRadius: item.id % 2 === 0 ? "50%" : "2px",
          }}
        />
      ))}
    </div>
  );
}

export function BookingSuccessScreen({
  booking,
  onViewBookings,
  onBookAgain,
  onGetDirections,
  onAddToCalendar,
  onShare,
  onDownloadReceipt,
}: BookingSuccessScreenProps) {
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center pt-8 px-5">
      <Confetti />

      <div className={`w-full max-w-md transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
        {/* Success icon */}
        <div className="text-center mb-6">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#32C766]/15 border-4 border-[#32C766]/30 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#32C766] flex items-center justify-center text-white shadow-lg shadow-[#32C766]/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-black text-foreground mb-1">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-sm font-medium">Your slot has been secured. See you on the court!</p>
        </div>

        {/* Booking ID */}
        {booking.bookingId && (
          <div className="bg-primary rounded-2xl p-4 text-center mb-5">
            <p className="text-primary-foreground/70 text-xs font-bold uppercase tracking-widest mb-1">Booking ID</p>
            <p className="text-primary-foreground text-xl font-black tracking-widest">{booking.bookingId}</p>
          </div>
        )}

        {/* Venue + details card */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden mb-5">
          <div className="flex border-b border-border">
            <div className="w-24 h-20 shrink-0 bg-muted">
              <img src={booking.venueImageUrl} alt={booking.venueName} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 px-4 py-3">
              <h3 className="font-black text-foreground text-sm mb-0.5">{booking.venueName}</h3>
              <p className="text-xs text-muted-foreground">{booking.venueLocation}</p>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {[
              { label: "Sport", value: booking.sport },
              { label: "Date", value: booking.date },
              { label: "Time", value: booking.timeSlot },
              { label: "Duration", value: `${booking.duration}h` },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-bold text-foreground">{row.value}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm border-t border-border pt-3">
              <span className="font-black text-foreground">Amount Paid</span>
              <span className="font-black text-primary text-base">{booking.currency}{booking.total}</span>
            </div>
          </div>
        </div>

        {/* Quick action grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: "Get Directions", onClick: onGetDirections },
            { label: "Add to Calendar", onClick: onAddToCalendar },
            { label: "Share Booking", onClick: onShare },
            { label: "Download Receipt", onClick: onDownloadReceipt },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.onClick}
              className="flex items-center justify-center gap-2 bg-card border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-all duration-200"
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Primary CTAs */}
        <div className="space-y-3">
          <button
            onClick={onViewBookings}
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-[1.01]"
          >
            View My Bookings
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <button
            onClick={onBookAgain}
            className="flex items-center justify-center gap-2 w-full border border-border text-foreground font-bold py-3.5 rounded-xl hover:border-foreground/30 transition-all duration-200"
          >
            Book Another Venue
          </button>
        </div>
      </div>
    </div>
  );
}
