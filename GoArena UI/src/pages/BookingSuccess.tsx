import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MapPin, Calendar, Clock, Download, Share2, RotateCcw, ArrowRight } from "lucide-react";
import { useBooking } from "../app/BookingContext";
import { venues } from "../app/data";

function Confetti() {
  const [items] = useState(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
      color: ["#32C766", "#0F7B45", "#FFC857", "#15202B", "#a3e635"][Math.floor(Math.random() * 5)],
      size: 6 + Math.random() * 8,
    }))
  );
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
}

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { booking, resetBooking } = useBooking();
  const venue = venues.find((v) => v.id === booking.venueId);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  if (!booking.bookingId) {
    navigate("/");
    return null;
  }

  const basePrice = booking.pricePerHour * booking.duration;
  const platformFee = Math.round(basePrice * 0.05);
  const gst = Math.round((basePrice + platformFee) * 0.18);
  const total = basePrice + platformFee + gst;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-8">
      <Confetti />

      {/* Success card */}
      <div
        className={`w-full transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Icon */}
        <div className="text-center mb-6">
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#32C766]/15 border-4 border-[#32C766]/30 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#32C766] flex items-center justify-center text-white text-4xl shadow-lg shadow-[#32C766]/30">
              ✓
            </div>
          </div>
          <h1 className="text-3xl font-black text-foreground mb-1">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-sm font-medium">
            Your slot has been secured. See you on the court!
          </p>
        </div>

        {/* Booking ID */}
        <div className="bg-[#0F7B45] rounded-2xl p-4 text-center mb-5">
          <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Booking ID</p>
          <p className="text-white text-xl font-black tracking-widest">{booking.bookingId}</p>
        </div>

        {/* Details card */}
        <div className="bg-white border border-border rounded-2xl overflow-hidden mb-5">
          {venue && (
            <div className="flex gap-0 border-b border-border">
              <div className="w-24 h-20 shrink-0 bg-muted">
                <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 px-4 py-3">
                <h3 className="font-black text-foreground text-sm mb-0.5">{venue.name}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin size={10} />
                  <span>{venue.location}</span>
                </div>
              </div>
            </div>
          )}
          <div className="p-4 space-y-3">
            {[
              { icon: <span className="text-sm">{booking.sportIcon}</span>, label: "Sport", value: booking.sport },
              { icon: <Calendar size={14} />, label: "Date", value: booking.date },
              { icon: <Clock size={14} />, label: "Time", value: booking.slot },
              { icon: <Clock size={14} />, label: "Duration", value: `${booking.duration} hour${booking.duration > 1 ? "s" : ""}` },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="text-primary">{row.icon}</div>
                  {row.label}
                </div>
                <span className="font-bold text-foreground">{row.value}</span>
              </div>
            ))}
            <div className="flex items-center justify-between text-sm border-t border-border pt-3 mt-1">
              <span className="font-black text-foreground">Amount Paid</span>
              <span className="font-black text-primary text-base">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { icon: <MapPin size={15} />, label: "Get Directions", action: () => {} },
            { icon: <Calendar size={15} />, label: "Add to Calendar", action: () => {} },
            { icon: <Share2 size={15} />, label: "Share Booking", action: () => {} },
            { icon: <Download size={15} />, label: "Download Receipt", action: () => {} },
          ].map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="flex items-center justify-center gap-2 bg-white border border-border rounded-xl px-4 py-3 text-sm font-bold text-foreground hover:border-primary hover:text-primary hover:bg-secondary transition-all duration-200"
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </div>

        {/* Primary CTAs */}
        <div className="space-y-3">
          <Link
            to="/bookings"
            className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:bg-[#0d6e3c] transition-all duration-200 hover:scale-[1.01]"
          >
            View My Bookings <ArrowRight size={16} />
          </Link>
          <button
            onClick={() => { resetBooking(); navigate("/search"); }}
            className="flex items-center justify-center gap-2 w-full border border-border text-foreground font-bold py-3.5 rounded-xl hover:border-foreground/30 transition-all duration-200"
          >
            <RotateCcw size={15} />
            Book Another Venue
          </button>
        </div>
      </div>
    </div>
  );
}
