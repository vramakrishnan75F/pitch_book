import { useState } from "react";
import { useNavigate } from "react-router";
import { Tag, ArrowRight, MapPin, Calendar, Clock, Shield } from "lucide-react";
import { useBooking } from "../app/BookingContext";
import { venues } from "../app/data";

const VALID_COUPONS: Record<string, number> = {
  PLAY10: 10,
  ARENA20: 20,
  FIRST50: 50,
};

export default function BookingSummary() {
  const navigate = useNavigate();
  const { booking } = useBooking();

  const venue = venues.find((v) => v.id === booking.venueId);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  const basePrice = booking.pricePerHour * booking.duration;
  const platformFee = Math.round(basePrice * 0.05);
  const subtotal = basePrice + platformFee;
  const discountPct = appliedCoupon ? VALID_COUPONS[appliedCoupon] : 0;
  const discount = Math.round(subtotal * discountPct / 100);
  const gst = Math.round((subtotal - discount) * 0.18);
  const total = subtotal - discount + gst;

  const applyCoupon = () => {
    const upper = coupon.trim().toUpperCase();
    if (VALID_COUPONS[upper]) {
      setAppliedCoupon(upper);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try PLAY10 or ARENA20.");
      setAppliedCoupon(null);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCoupon("");
    setCouponError("");
  };

  const handleProceed = () => navigate("/booking/payment");

  if (!booking.venueId) {
    navigate("/search");
    return null;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-foreground mb-1">Booking Summary</h1>
        <p className="text-sm text-muted-foreground">Review your booking before payment</p>
      </div>

      {/* Venue card */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden mb-5">
        {venue && (
          <div className="flex gap-0">
            <div className="w-28 h-28 shrink-0 bg-muted">
              <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-4">
              <h3 className="font-black text-foreground text-[15px] mb-1">{venue.name}</h3>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                <MapPin size={10} />
                <span>{venue.location}</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-secondary text-primary px-2 py-1 rounded-full">
                {booking.sportIcon} {booking.sport}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Booking details */}
      <div className="bg-white border border-border rounded-2xl p-5 mb-5">
        <h3 className="text-sm font-black text-foreground mb-4">Booking Details</h3>
        <div className="space-y-3">
          {[
            { icon: <Calendar size={14} />, label: "Date", value: booking.date },
            { icon: <Clock size={14} />, label: "Time", value: booking.slot },
            { icon: <Clock size={14} />, label: "Duration", value: `${booking.duration} hour${booking.duration > 1 ? "s" : ""}` },
            { icon: <span className="text-sm">{booking.sportIcon}</span>, label: "Sport", value: booking.sport },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <div className="text-primary">{row.icon}</div>
                {row.label}
              </div>
              <span className="text-sm font-bold text-foreground">{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coupon */}
      <div className="bg-white border border-border rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-3">
          <Tag size={15} className="text-primary" />
          <h3 className="text-sm font-black text-foreground">Coupon / Promo Code</h3>
        </div>

        {appliedCoupon ? (
          <div className="flex items-center justify-between bg-secondary border border-primary/20 rounded-xl px-4 py-3">
            <div>
              <div className="text-xs font-black text-primary">{appliedCoupon}</div>
              <div className="text-xs text-muted-foreground">{discountPct}% discount applied</div>
            </div>
            <button onClick={removeCoupon} className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors">
              Remove
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <input
              value={coupon}
              onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponError(""); }}
              placeholder="Enter code (e.g. PLAY10)"
              className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
            />
            <button
              onClick={applyCoupon}
              className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-xl hover:bg-[#0d6e3c] transition-all"
            >
              Apply
            </button>
          </div>
        )}
        {couponError && <p className="text-xs text-red-500 mt-2 font-semibold">{couponError}</p>}
        {!appliedCoupon && !couponError && (
          <p className="text-xs text-muted-foreground mt-2">Try: PLAY10, ARENA20, or FIRST50</p>
        )}
      </div>

      {/* Price breakdown */}
      <div className="bg-white border border-border rounded-2xl p-5 mb-6">
        <h3 className="text-sm font-black text-foreground mb-4">Price Breakdown</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Court fee (₹{booking.pricePerHour} × {booking.duration}h)</span>
            <span className="font-semibold text-foreground">₹{basePrice}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Platform fee (5%)</span>
            <span className="font-semibold text-foreground">₹{platformFee}</span>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between text-primary">
              <span className="font-semibold">Discount ({discountPct}%)</span>
              <span className="font-semibold">-₹{discount}</span>
            </div>
          )}
          <div className="flex justify-between text-muted-foreground">
            <span>GST (18%)</span>
            <span className="font-semibold text-foreground">₹{gst}</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between font-black text-foreground text-base">
            <span>Total Payable</span>
            <span className="text-primary">₹{total}</span>
          </div>
        </div>
      </div>

      {/* Trust */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-5">
        <Shield size={12} className="text-primary" />
        <span>Free cancellation up to 2 hours before your slot</span>
      </div>

      <button
        onClick={handleProceed}
        className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d6e3c] transition-all duration-200 hover:scale-[1.01] active:scale-95 text-base"
      >
        Proceed to Payment <ArrowRight size={18} />
      </button>
    </div>
  );
}
