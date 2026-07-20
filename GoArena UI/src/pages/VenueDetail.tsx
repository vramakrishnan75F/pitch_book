import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { Star, MapPin, Heart, ChevronLeft, ChevronRight, Shield, Clock, Check, ArrowRight } from "lucide-react";
import { venues } from "../app/data";
import { useBooking } from "../app/BookingContext";

const TABS = ["Overview", "Amenities", "Reviews"] as const;

export default function VenueDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setBooking } = useBooking();

  const venue = venues.find((v) => v.id === Number(id));
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Overview");
  const [imgIndex, setImgIndex] = useState(0);
  const [wishlist, setWishlist] = useState(false);
  const [activeSport, setActiveSport] = useState(venue?.sports[0] || "");

  if (!venue) {
    return (
      <div className="py-32 text-center">
        <div className="text-5xl mb-4">🏟️</div>
        <h2 className="text-xl font-black text-foreground mb-2">Venue not found</h2>
        <Link to="/search" className="text-primary font-bold text-sm hover:underline">Browse all venues →</Link>
      </div>
    );
  }

  const handleBookNow = () => {
    setBooking({
      venueId: venue.id,
      venueName: venue.name,
      sport: activeSport,
      sportIcon: venue.sportIcon,
      pricePerHour: venue.pricePerHour,
    });
    navigate("/booking/slots");
  };

  return (
    <div className="pb-32">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground font-semibold">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/search" className="hover:text-primary transition-colors">Venues</Link>
          <ChevronRight size={12} />
          <span className="text-foreground">{venue.name}</span>
        </nav>
      </div>

      {/* Image gallery */}
      <div className="max-w-7xl mx-auto px-5 mb-8">
        <div className="relative rounded-2xl overflow-hidden h-72 md:h-[420px] bg-muted group">
          <img
            src={venue.images[imgIndex]}
            alt={venue.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />

          {/* Nav arrows */}
          {venue.images.length > 1 && (
            <>
              <button
                onClick={() => setImgIndex((i) => (i - 1 + venue.images.length) % venue.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setImgIndex((i) => (i + 1) % venue.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {venue.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`rounded-full transition-all ${i === imgIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"}`}
              />
            ))}
          </div>

          {/* Wishlist */}
          <button
            onClick={() => setWishlist((v) => !v)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm shadow-md transition-all duration-200 hover:scale-110 ${
              wishlist ? "bg-red-500 text-white" : "bg-white/90 text-foreground"
            }`}
          >
            <Heart size={16} fill={wishlist ? "currentColor" : "none"} />
          </button>

          {/* Badge */}
          {venue.badge && (
            <div className="absolute top-4 left-4 bg-white/95 text-primary text-xs font-black px-3 py-1.5 rounded-full shadow-sm">
              {venue.badge}
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {venue.images.length > 1 && (
          <div className="flex gap-2 mt-3">
            {venue.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${i === imgIndex ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content + sidebar */}
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: details */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{venue.sportIcon}</span>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{venue.sports.join(" · ")}</span>
                <span className="text-xs font-bold text-muted-foreground">·</span>
                <span className="text-xs font-bold text-muted-foreground">{venue.type}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-foreground mb-2">{venue.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{venue.address}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-center gap-1 justify-end mb-1">
                <Star size={16} className="text-[#FFC857]" fill="#FFC857" />
                <span className="text-lg font-black text-foreground">{venue.rating}</span>
              </div>
              <div className="text-xs text-muted-foreground">{venue.reviews} reviews</div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Distance", value: venue.distance, icon: "📍" },
              { label: "Price/hr", value: `₹${venue.pricePerHour}`, icon: "💰" },
              { label: "Status", value: venue.available ? "Open Now" : "Booked", icon: venue.available ? "✅" : "❌" },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-border rounded-xl p-3 text-center">
                <div className="text-xl mb-1">{s.icon}</div>
                <div className="text-sm font-black text-foreground">{s.value}</div>
                <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-muted p-1 rounded-xl mb-6 self-start w-fit">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeTab === tab ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === "Overview" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-black text-foreground mb-2">About this venue</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{venue.description}</p>
              </div>
              <div>
                <h3 className="text-base font-black text-foreground mb-3">Venue Rules</h3>
                <ul className="space-y-2">
                  {venue.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === "Amenities" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {venue.amenities.map((a) => (
                <div key={a} className="flex items-center gap-2.5 bg-white border border-border rounded-xl p-3">
                  <div className="w-7 h-7 bg-secondary rounded-lg flex items-center justify-center">
                    <Check size={13} className="text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{a}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white border border-border rounded-xl p-4">
                <div className="text-center">
                  <div className="text-4xl font-black text-foreground">{venue.rating}</div>
                  <div className="flex justify-center gap-0.5 my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} fill={i < Math.round(venue.rating) ? "#FFC857" : "none"} className={i < Math.round(venue.rating) ? "text-[#FFC857]" : "text-muted-foreground"} />
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground">{venue.reviews} reviews</div>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5, 4, 3].map((n) => (
                    <div key={n} className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground w-4">{n}</span>
                      <Star size={10} fill="#FFC857" className="text-[#FFC857]" />
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#FFC857] rounded-full"
                          style={{ width: n === 5 ? "75%" : n === 4 ? "20%" : "5%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {venue.reviewList.map((r) => (
                <div key={r.name} className="bg-white border border-border rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-[10px] font-black shrink-0">
                      {r.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.date}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={11} fill="#FFC857" className="text-[#FFC857]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: booking card (desktop) */}
        <div className="hidden lg:block">
          <div className="bg-white border border-border rounded-2xl p-6 sticky top-24 shadow-lg">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-2xl font-black text-primary">₹{venue.pricePerHour}</span>
              <span className="text-sm text-muted-foreground">/hour</span>
            </div>
            <div className="flex items-center gap-1 mb-5">
              <Star size={13} fill="#FFC857" className="text-[#FFC857]" />
              <span className="text-sm font-bold text-foreground">{venue.rating}</span>
              <span className="text-xs text-muted-foreground">({venue.reviews} reviews)</span>
            </div>

            {/* Sport selector */}
            {venue.sports.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-black text-foreground uppercase tracking-wider mb-2">Sport</p>
                <div className="flex flex-wrap gap-2">
                  {venue.sports.map((s) => (
                    <button
                      key={s}
                      onClick={() => setActiveSport(s)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                        activeSport === s ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      {venue.sportIcon} {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleBookNow}
              disabled={!venue.available}
              className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 mb-4 ${
                venue.available
                  ? "bg-primary text-primary-foreground hover:bg-[#0d6e3c] hover:scale-[1.02] active:scale-95"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {venue.available ? (
                <>Select Time Slot <ArrowRight size={16} /></>
              ) : (
                "Currently Unavailable"
              )}
            </button>

            <div className="space-y-2.5">
              {[
                { icon: <Shield size={14} />, text: "Free cancellation up to 2 hours before" },
                { icon: <Clock size={14} />, text: "Instant booking confirmation" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="text-primary">{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border px-5 py-4 flex items-center justify-between gap-4 z-40">
        <div>
          <div className="text-lg font-black text-primary">₹{venue.pricePerHour}<span className="text-xs text-muted-foreground font-medium">/hr</span></div>
          <div className="flex items-center gap-1">
            <Star size={11} fill="#FFC857" className="text-[#FFC857]" />
            <span className="text-xs font-bold text-foreground">{venue.rating}</span>
            <span className="text-xs text-muted-foreground">({venue.reviews})</span>
          </div>
        </div>
        <button
          onClick={handleBookNow}
          disabled={!venue.available}
          className={`font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 ${
            venue.available ? "bg-primary text-primary-foreground hover:bg-[#0d6e3c]" : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {venue.available ? "Book Now" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
