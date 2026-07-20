import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Calendar, Clock, Download, RotateCcw, X } from "lucide-react";

type BookingStatus = "upcoming" | "past" | "cancelled";

type BookingEntry = {
  id: string;
  venueName: string;
  venueLocation: string;
  venueImage: string;
  sport: string;
  sportIcon: string;
  date: string;
  time: string;
  duration: number;
  total: number;
  status: BookingStatus;
};

const MOCK_BOOKINGS: BookingEntry[] = [
  {
    id: "GA-A8F3C2",
    venueName: "Elite Football Ground",
    venueLocation: "Whitefield, Bangalore",
    venueImage: "https://images.unsplash.com/photo-1513609698234-16d36e4b7a65?w=400&h=240&fit=crop&auto=format",
    sport: "Football",
    sportIcon: "⚽",
    date: "Aug 10, 2025",
    time: "7:00 PM",
    duration: 1,
    total: 1020,
    status: "upcoming",
  },
  {
    id: "GA-B9D4E1",
    venueName: "BlueShuttle Badminton",
    venueLocation: "Indiranagar, Bangalore",
    venueImage: "https://images.unsplash.com/photo-1775993167393-f2add1f8eec2?w=400&h=240&fit=crop&auto=format",
    sport: "Badminton",
    sportIcon: "🏸",
    date: "Aug 6, 2025",
    time: "6:00 AM",
    duration: 1,
    total: 449,
    status: "upcoming",
  },
  {
    id: "GA-C2F7B9",
    venueName: "SkyLine Tennis Club",
    venueLocation: "Koramangala, Bangalore",
    venueImage: "https://images.unsplash.com/photo-1761404984667-16d6c9158c59?w=400&h=240&fit=crop&auto=format",
    sport: "Tennis",
    sportIcon: "🎾",
    date: "Jul 28, 2025",
    time: "9:00 AM",
    duration: 2,
    total: 1527,
    status: "past",
  },
  {
    id: "GA-D5A3F6",
    venueName: "Urban Hoops Arena",
    venueLocation: "HSR Layout, Bangalore",
    venueImage: "https://images.unsplash.com/photo-1502014822147-1aedfb0676e0?w=400&h=240&fit=crop&auto=format",
    sport: "Basketball",
    sportIcon: "🏀",
    date: "Jul 20, 2025",
    time: "6:00 PM",
    duration: 1,
    total: 641,
    status: "past",
  },
  {
    id: "GA-E1B8C4",
    venueName: "Elite Football Ground",
    venueLocation: "Whitefield, Bangalore",
    venueImage: "https://images.unsplash.com/photo-1513609698234-16d36e4b7a65?w=400&h=240&fit=crop&auto=format",
    sport: "Football",
    sportIcon: "⚽",
    date: "Jul 15, 2025",
    time: "8:00 PM",
    duration: 1,
    total: 1020,
    status: "cancelled",
  },
];

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string }> = {
  upcoming: { label: "Upcoming", color: "text-primary", bg: "bg-secondary" },
  past: { label: "Completed", color: "text-muted-foreground", bg: "bg-muted" },
  cancelled: { label: "Cancelled", color: "text-red-500", bg: "bg-red-50" },
};

export default function MyBookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BookingStatus>("upcoming");

  const filtered = MOCK_BOOKINGS.filter((b) => b.status === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-5 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-foreground mb-1">My Bookings</h1>
          <p className="text-sm text-muted-foreground">All your past and upcoming sports sessions</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-muted p-1 rounded-xl mb-7 self-start w-fit">
          {(["upcoming", "past", "cancelled"] as BookingStatus[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all duration-200 ${
                activeTab === tab ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-black ${activeTab === tab ? "bg-primary/10 text-primary" : "bg-muted-foreground/10 text-muted-foreground"}`}>
                {MOCK_BOOKINGS.filter((b) => b.status === tab).length}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">🏟️</div>
            <h3 className="text-xl font-black text-foreground mb-2">No {activeTab} bookings</h3>
            <p className="text-muted-foreground text-sm mb-6">
              {activeTab === "upcoming"
                ? "You have no upcoming bookings. Find a venue and book a slot!"
                : `No ${activeTab} bookings to show.`}
            </p>
            {activeTab === "upcoming" && (
              <button
                onClick={() => navigate("/search")}
                className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-xl hover:bg-[#0d6e3c] transition-all"
              >
                Find a Venue
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking) => {
              const statusCfg = STATUS_CONFIG[booking.status];
              return (
                <div key={booking.id} className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <div className="flex gap-0">
                    {/* Image */}
                    <div className="w-32 sm:w-40 shrink-0 bg-muted">
                      <img src={booking.venueImage} alt={booking.venueName} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-bold text-foreground text-[15px] leading-tight mb-0.5">{booking.venueName}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin size={10} />
                            <span>{booking.venueLocation}</span>
                          </div>
                        </div>
                        <span className={`shrink-0 text-[10px] font-black px-2.5 py-1 rounded-full ${statusCfg.bg} ${statusCfg.color}`}>
                          {statusCfg.label}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <span>{booking.sportIcon}</span> {booking.sport}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={10} /> {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={10} /> {booking.time} · {booking.duration}h
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wide">Paid</span>
                          <div className="text-sm font-black text-primary">₹{booking.total}</div>
                        </div>
                        <div className="flex gap-2">
                          {booking.status === "upcoming" && (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                              <X size={12} /> Cancel
                            </button>
                          )}
                          {booking.status === "past" && (
                            <button
                              onClick={() => navigate("/search")}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary border border-primary/30 rounded-lg hover:bg-secondary transition-colors"
                            >
                              <RotateCcw size={12} /> Rebook
                            </button>
                          )}
                          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-muted-foreground border border-border rounded-lg hover:border-foreground/30 transition-colors">
                            <Download size={12} /> Invoice
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Booking ID footer */}
                  <div className="px-4 py-2 bg-muted/40 border-t border-border">
                    <span className="text-[10px] text-muted-foreground font-semibold">Booking ID: {booking.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
