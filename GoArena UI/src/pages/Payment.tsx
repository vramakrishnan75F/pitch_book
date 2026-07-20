import { useState } from "react";
import { useNavigate } from "react-router";
import { Shield, Lock, ChevronRight } from "lucide-react";
import { useBooking } from "../app/BookingContext";
import { venues } from "../app/data";

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";

const UPI_APPS = [
  { id: "gpay", name: "Google Pay", icon: "🟢", color: "bg-white" },
  { id: "phonepe", name: "PhonePe", icon: "🟣", color: "bg-white" },
  { id: "paytm", name: "Paytm", icon: "🔵", color: "bg-white" },
  { id: "bhim", name: "BHIM", icon: "🔴", color: "bg-white" },
];

const BANKS = ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra", "Yes Bank"];

const WALLETS = [
  { name: "Paytm Wallet", icon: "💙" },
  { name: "Amazon Pay", icon: "🧡" },
  { name: "Mobikwik", icon: "💜" },
  { name: "FreeCharge", icon: "💚" },
];

export default function Payment() {
  const navigate = useNavigate();
  const { booking, setBooking } = useBooking();
  const venue = venues.find((v) => v.id === booking.venueId);

  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [selectedUpi, setSelectedUpi] = useState<string | null>(null);
  const [upiId, setUpiId] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const basePrice = booking.pricePerHour * booking.duration;
  const platformFee = Math.round(basePrice * 0.05);
  const gst = Math.round((basePrice + platformFee) * 0.18);
  const total = basePrice + platformFee + gst;

  const formatCardNum = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  const handlePay = () => {
    setLoading(true);
    const bookingId = "GA-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setTimeout(() => {
      setBooking({ bookingId });
      navigate("/booking/success");
    }, 2000);
  };

  const METHOD_TABS: { id: PaymentMethod; label: string; icon: string }[] = [
    { id: "upi", label: "UPI", icon: "📱" },
    { id: "card", label: "Cards", icon: "💳" },
    { id: "netbanking", label: "Net Banking", icon: "🏦" },
    { id: "wallet", label: "Wallets", icon: "👛" },
  ];

  return (
    <div>
      {/* Trust header */}
      <div className="flex items-center justify-between bg-[#F0FAF4] border border-primary/15 rounded-2xl px-5 py-3 mb-6">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-primary" />
          <span className="text-sm font-bold text-foreground">Secure Payment</span>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
          <span className="flex items-center gap-1"><Lock size={11} />SSL Encrypted</span>
          <span>•</span>
          <span>Powered by Razorpay</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Payment form */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-border rounded-2xl overflow-hidden mb-5">
            <h2 className="text-base font-black text-foreground px-5 pt-5 mb-4">Choose Payment Method</h2>

            {/* Method tabs */}
            <div className="flex border-b border-border px-5">
              {METHOD_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setMethod(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 -mb-px transition-all ${
                    method === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {/* UPI */}
              {method === "upi" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {UPI_APPS.map((app) => (
                      <button
                        key={app.id}
                        onClick={() => setSelectedUpi(app.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                          selectedUpi === app.id ? "border-primary bg-secondary" : "border-border hover:border-primary/40"
                        }`}
                      >
                        <span className="text-xl">{app.icon}</span>
                        <span className="text-sm font-bold text-foreground">{app.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground font-semibold">or enter UPI ID</span>
                    <div className="flex-1 h-px bg-border" />
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className="flex-1 bg-muted rounded-xl px-4 py-2.5 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
                    />
                    <button className="px-4 py-2.5 text-sm font-bold text-primary border border-primary rounded-xl hover:bg-secondary transition-all">
                      Verify
                    </button>
                  </div>
                </div>
              )}

              {/* Cards */}
              {method === "card" && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-black text-foreground uppercase tracking-wider block mb-1.5">Card Number</label>
                    <input
                      value={cardNum}
                      onChange={(e) => setCardNum(formatCardNum(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-muted rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors tracking-widest"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-black text-foreground uppercase tracking-wider block mb-1.5">Name on Card</label>
                    <input
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Rahul Sharma"
                      className="w-full bg-muted rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-black text-foreground uppercase tracking-wider block mb-1.5">Expiry</label>
                      <input
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        placeholder="MM/YY"
                        className="w-full bg-muted rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-black text-foreground uppercase tracking-wider block mb-1.5">CVV</label>
                      <input
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                        placeholder="•••"
                        type="password"
                        className="w-full bg-muted rounded-xl px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary/30 transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {method === "netbanking" && (
                <div className="space-y-2">
                  {BANKS.map((bank) => (
                    <button
                      key={bank}
                      onClick={() => setSelectedBank(bank)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all text-sm font-semibold ${
                        selectedBank === bank ? "border-primary bg-secondary text-primary" : "border-border text-foreground hover:border-primary/40"
                      }`}
                    >
                      {bank}
                      <ChevronRight size={14} className="text-muted-foreground" />
                    </button>
                  ))}
                </div>
              )}

              {/* Wallets */}
              {method === "wallet" && (
                <div className="grid grid-cols-2 gap-2">
                  {WALLETS.map((wallet) => (
                    <button
                      key={wallet.name}
                      onClick={() => setSelectedWallet(wallet.name)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                        selectedWallet === wallet.name ? "border-primary bg-secondary" : "border-border hover:border-primary/40"
                      }`}
                    >
                      <span className="text-2xl">{wallet.icon}</span>
                      <span className="text-sm font-bold text-foreground">{wallet.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={loading}
            className={`w-full font-bold py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all duration-200 ${
              loading
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-[#0d6e3c] hover:scale-[1.01] active:scale-95"
            }`}
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Lock size={16} />
                Pay ₹{total} Securely
              </>
            )}
          </button>

          <p className="text-center text-xs text-muted-foreground mt-3">
            Your payment is secured with 256-bit SSL encryption
          </p>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-border rounded-2xl p-5 sticky top-24">
            <h3 className="text-sm font-black text-foreground mb-4">Order Summary</h3>
            {venue && (
              <div className="flex gap-3 items-center mb-4 pb-4 border-b border-border">
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-muted">
                  <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{venue.name}</p>
                  <p className="text-xs text-muted-foreground">{booking.sport} · {booking.date}</p>
                  <p className="text-xs text-muted-foreground">{booking.slot} · {booking.duration}h</p>
                </div>
              </div>
            )}
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Court fee</span>
                <span className="font-semibold text-foreground">₹{basePrice}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Platform fee</span>
                <span className="font-semibold text-foreground">₹{platformFee}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (18%)</span>
                <span className="font-semibold text-foreground">₹{gst}</span>
              </div>
              <div className="flex justify-between font-black text-foreground text-base border-t border-border pt-2.5 mt-2.5">
                <span>Total</span>
                <span className="text-primary">₹{total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
