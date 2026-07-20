import { useState } from "react";
import { useNavigate, Link } from "react-router";
import {
  Search, MapPin, Calendar, ChevronRight, Star, Heart, ArrowRight,
  Shield, Zap, Trophy, Users, Instagram, Twitter, Facebook, Clock,
} from "lucide-react";
import { sports, venues } from "../app/data";

const howItWorks = [
  { step: "01", icon: "🔍", title: "Discover", desc: "Search for venues near you by sport, location, date and time." },
  { step: "02", icon: "📅", title: "Book a Slot", desc: "Pick your preferred time slot and secure it in under 60 seconds." },
  { step: "03", icon: "⚽", title: "Play & Enjoy", desc: "Show up, play your game, and build your sports community." },
];

const tournaments = [
  {
    title: "Sunday Premier League",
    sport: "Football",
    date: "Aug 3 – Sep 14, 2025",
    teams: "16 Teams",
    prize: "₹50,000",
    image: "https://images.unsplash.com/photo-1679391029864-d46f366a456b?w=700&h=440&fit=crop&auto=format",
    tag: "Registration Open",
  },
  {
    title: "City Badminton Open",
    sport: "Badminton",
    date: "Aug 10 – Aug 12, 2025",
    teams: "64 Players",
    prize: "₹20,000",
    image: "https://images.unsplash.com/photo-1718452739586-5b467f1f109b?w=700&h=440&fit=crop&auto=format",
    tag: "Closing Soon",
  },
];

const testimonials = [
  { name: "Arjun Mehta", role: "Weekend Footballer", avatar: "AM", quote: "GoArena changed how our group books grounds. No more WhatsApp chaos — just find, book, and play.", rating: 5 },
  { name: "Priya Sharma", role: "Badminton Enthusiast", avatar: "PS", quote: "Love how easy it is to book a court at BlueShuttle. The whole process takes less than a minute.", rating: 5 },
  { name: "Rahul Nair", role: "Tennis Coach", avatar: "RN", quote: "My students use GoArena every week. The slot availability is always accurate — no surprises.", rating: 5 },
];

export default function Landing() {
  const navigate = useNavigate();
  const [activeSport, setActiveSport] = useState("football");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<"venues" | "open">("venues");
  const [location, setLocation] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [date, setDate] = useState("2025-08-03");

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (selectedSport) params.set("sport", selectedSport);
    if (date) params.set("date", date);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[580px] flex items-center overflow-hidden bg-[#0a1a10]">
        <img
          src="https://images.unsplash.com/photo-1630047254778-cfd0c27381de?w=1800&h=960&fit=crop&auto=format"
          alt="Sports arena illuminated at night"
          className="absolute inset-0 w-full h-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#15202B]/50 via-[#15202B]/10 to-[#15202B]/85" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 w-full pt-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-7">
              <span className="w-2 h-2 bg-[#32C766] rounded-full animate-pulse" />
              320+ venues available today
            </div>
            <h1 className="text-5xl md:text-[72px] font-black text-white leading-[1.03] tracking-tight mb-4">
              Find Your
              <br />
              <span className="text-[#32C766]">Next Game.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/68 font-medium mb-10 max-w-xl leading-relaxed">
              Discover and book premium sports venues near you. Football, Cricket, Badminton, Tennis and more.
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <MapPin className="text-primary shrink-0" size={18} />
                <input
                  placeholder="Your city or area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none bg-transparent"
                />
              </div>
              <div className="hidden md:block w-px bg-border my-2" />
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <span className="text-base shrink-0">⚽</span>
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="flex-1 text-sm font-semibold text-foreground outline-none bg-transparent cursor-pointer appearance-none"
                >
                  <option value="">Any Sport</option>
                  {sports.map((s) => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div className="hidden md:block w-px bg-border my-2" />
              <div className="flex-1 flex items-center gap-3 px-4 py-3">
                <Calendar className="text-primary shrink-0" size={18} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 text-sm font-semibold text-foreground outline-none bg-transparent cursor-pointer"
                />
              </div>
              <button
                onClick={handleSearch}
                className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-[#0d6e3c] transition-all duration-200 hover:scale-[1.03] active:scale-95"
              >
                <Search size={16} />
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-8 hidden md:flex gap-8">
          {[{ value: "500+", label: "Venues" }, { value: "1.2M+", label: "Bookings" }, { value: "4.9★", label: "Avg Rating" }].map((s) => (
            <div key={s.label} className="text-right">
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-[10px] text-white/55 font-bold uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SPORT CATEGORIES */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between mb-7">
            <h2 className="text-2xl font-black text-foreground">Browse by Sport</h2>
            <Link to="/search" className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all duration-200">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
            {sports.map((sport) => (
              <button
                key={sport.id}
                onClick={() => { setActiveSport(sport.id); navigate(`/search?sport=${sport.id}`); }}
                className={`flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
                  activeSport === sport.id
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "border-border bg-white text-foreground hover:border-primary/40 hover:bg-secondary"
                }`}
              >
                <span className="text-2xl">{sport.icon}</span>
                <span className="text-xs font-bold whitespace-nowrap">{sport.label}</span>
                <span className={`text-[10px] font-bold ${activeSport === sport.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {sport.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VENUES */}
      <section className="py-16 max-w-7xl mx-auto px-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-9">
          <div className="flex items-center gap-1 bg-muted p-1 rounded-xl self-start">
            {(["venues", "open"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeTab === tab ? "bg-white text-primary shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "venues" ? "Featured Venues" : "Open Games"}
              </button>
            ))}
          </div>
          <Link to="/search" className="hidden sm:flex text-sm font-bold text-primary items-center gap-1 hover:gap-2 transition-all duration-200">
            See all venues <ChevronRight size={14} />
          </Link>
        </div>

        {activeTab === "venues" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {venues.map((venue) => (
              <div
                key={venue.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/venue/${venue.id}`)}
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  <img
                    src={venue.images[0]}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    {venue.badge ? (
                      <span className="bg-white/95 backdrop-blur-sm text-primary text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                        {venue.badge}
                      </span>
                    ) : <span />}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(venue.id); }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-110 shadow-sm ${
                        wishlist.includes(venue.id) ? "bg-red-500 text-white" : "bg-white/90 text-foreground"
                      }`}
                    >
                      <Heart size={13} fill={wishlist.includes(venue.id) ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${venue.available ? "bg-[#32C766]/90 text-white" : "bg-foreground/55 text-white"}`}>
                      {venue.available ? "Slots Available" : "Fully Booked"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-foreground text-[15px] mb-1 leading-tight">{venue.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs mb-3">
                    <MapPin size={10} />
                    <span>{venue.location}</span>
                    <span className="ml-auto font-semibold">{venue.distance}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-[#FFC857]" fill="#FFC857" />
                      <span className="text-sm font-bold text-foreground">{venue.rating}</span>
                      <span className="text-xs text-muted-foreground">({venue.reviews})</span>
                    </div>
                    <div>
                      <span className="text-sm font-black text-primary">₹{venue.pricePerHour}</span>
                      <span className="text-xs text-muted-foreground">/hr</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {venue.amenities.slice(0, 2).map((a) => (
                      <span key={a} className="text-[10px] font-bold bg-secondary text-primary px-2 py-0.5 rounded-full">{a}</span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/venue/${venue.id}`); }}
                    className="w-full mt-4 bg-primary text-primary-foreground text-sm font-bold py-2.5 rounded-xl hover:bg-[#0d6e3c] transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-border rounded-2xl p-14 text-center">
            <div className="text-6xl mb-5">🏃</div>
            <h3 className="text-xl font-black text-foreground mb-2">Find Open Games Near You</h3>
            <p className="text-muted-foreground text-sm mb-7 max-w-sm mx-auto leading-relaxed">
              Join ongoing games and meet new players. Select your sport and area to see what is happening today.
            </p>
            <Link to="/search?tab=open" className="inline-block bg-primary text-primary-foreground font-bold px-8 py-3 rounded-xl hover:bg-[#0d6e3c] transition-all duration-200 hover:scale-105">
              Browse Open Games
            </Link>
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-3">How GoArena Works</h2>
            <p className="text-white/65 text-lg font-medium">Book your next game in under 60 seconds.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            {howItWorks.map((step, i) => (
              <div key={step.step} className="relative text-center">
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[58%] w-[84%] border-t-2 border-dashed border-white/20" />
                )}
                <div className="relative z-10 inline-flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl mb-5 border border-white/20">
                    {step.icon}
                  </div>
                  <div className="text-[#32C766] text-[11px] font-black uppercase tracking-widest mb-2">Step {step.step}</div>
                  <h3 className="text-xl font-black text-white mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm font-medium leading-relaxed max-w-[240px]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOURNAMENTS */}
      <section className="py-16 max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-9">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={16} className="text-[#FFC857]" />
              <span className="text-[11px] font-black text-[#FFC857] uppercase tracking-widest">Tournaments</span>
            </div>
            <h2 className="text-3xl font-black text-foreground">Compete & Win</h2>
          </div>
          <Link to="/search?tab=tournaments" className="hidden md:flex text-sm font-bold text-primary items-center gap-1 hover:gap-2 transition-all duration-200">
            View all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tournaments.map((t) => (
            <div key={t.title} className="group relative rounded-2xl overflow-hidden h-64 cursor-pointer bg-muted">
              <img src={t.image} alt={t.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15202B] via-[#15202B]/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-[#FFC857] text-[#15202B] text-[10px] font-black px-3 py-1.5 rounded-full">{t.tag}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-[11px] font-bold text-[#32C766] mb-1 uppercase tracking-wide">{t.sport}</div>
                <h3 className="text-xl font-black text-white mb-2">{t.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-white/65 text-xs font-semibold mb-3">
                  <span className="flex items-center gap-1"><Calendar size={11} />{t.date}</span>
                  <span className="flex items-center gap-1"><Users size={11} />{t.teams}</span>
                  <span className="flex items-center gap-1"><Trophy size={11} />{t.prize}</span>
                </div>
                <button className="bg-white text-foreground text-xs font-black px-4 py-2 rounded-lg hover:bg-[#32C766] hover:text-white transition-all duration-200">
                  Register Now →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-foreground mb-3">Loved by Players</h2>
            <p className="text-muted-foreground font-medium">Real stories from the GoArena community</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-background rounded-2xl p-6 border border-border hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-[#FFC857]" fill="#FFC857" />
                  ))}
                </div>
                <p className="text-foreground font-medium text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-[11px] font-black shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP CTA */}
      <section className="py-20 bg-[#15202B]">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-14">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-[#32C766]/10 text-[#32C766] text-xs font-black px-4 py-2 rounded-full mb-7 border border-[#32C766]/20">
                <Zap size={12} />
                Coming to iOS &amp; Android
              </div>
              <h2 className="text-4xl md:text-[52px] font-black text-white leading-tight mb-4">
                Your Game,<br />
                <span className="text-[#32C766]">Anywhere.</span>
              </h2>
              <p className="text-white/55 font-medium mb-9 text-lg leading-relaxed">
                Book courts, join games, and manage your sports life from your pocket. The GoArena app is coming soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex items-center gap-3 bg-white text-foreground font-bold px-6 py-3.5 rounded-xl hover:bg-[#32C766] hover:text-white transition-all duration-200 hover:scale-105">
                  <span className="text-2xl leading-none">🍎</span>
                  <div className="text-left">
                    <div className="text-[10px] font-semibold opacity-60">Download on the</div>
                    <div className="text-sm font-black">App Store</div>
                  </div>
                </button>
                <button className="flex items-center gap-3 border border-white/15 text-white font-bold px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105">
                  <span className="text-2xl leading-none">▶</span>
                  <div className="text-left">
                    <div className="text-[10px] font-semibold opacity-60">Get it on</div>
                    <div className="text-sm font-black">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 shrink-0 w-full max-w-sm">
              {[
                { icon: <Shield size={20} />, title: "Secure Payments", desc: "PCI-DSS compliant checkout" },
                { icon: <Clock size={20} />, title: "Instant Booking", desc: "Confirmed in under 60s" },
                { icon: <Users size={20} />, title: "50K+ Players", desc: "Active sports community" },
                { icon: <Trophy size={20} />, title: "500+ Venues", desc: "Across 12 cities" },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <div className="text-[#32C766] mb-2.5">{item.icon}</div>
                  <div className="text-white text-sm font-bold mb-0.5">{item.title}</div>
                  <div className="text-white/45 text-xs">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d1a22] pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-black text-base leading-none">G</span>
                </div>
                <span className="text-lg font-black text-white tracking-tight">Go<span className="text-[#32C766]">Arena</span></span>
              </div>
              <p className="text-white/45 text-sm font-medium leading-relaxed mb-6 max-w-[240px]">
                Find. Book. Play. The world's most trusted platform for discovering and booking sports venues.
              </p>
              <div className="flex gap-3">
                {[Instagram, Twitter, Facebook].map((Icon, i) => (
                  <a key={i} href="#" className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/40 hover:text-white hover:border-white/25 transition-colors">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>
            {[
              { heading: "Platform", links: ["Venues", "Open Games", "Tournaments", "Coaches", "Communities"] },
              { heading: "Sports", links: ["Football", "Cricket", "Badminton", "Tennis", "Basketball"] },
              { heading: "Company", links: ["About", "Careers", "Blog", "Press", "Contact"] },
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-4">{col.heading}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/45 text-sm font-medium hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/28 text-xs font-medium">© 2025 GoArena Technologies Pvt. Ltd. All rights reserved.</p>
            <div className="flex items-center gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a key={link} href="#" className="text-white/28 text-xs font-medium hover:text-white/65 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
