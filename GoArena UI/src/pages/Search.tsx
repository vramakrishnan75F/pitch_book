import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Search as SearchIcon, MapPin, Star, Heart, SlidersHorizontal, Map, List, X } from "lucide-react";
import { sports, venues } from "../app/data";

const priceRanges = [
  { label: "Under ₹300", min: 0, max: 300 },
  { label: "₹300 – ₹600", min: 300, max: 600 },
  { label: "₹600 – ₹1000", min: 600, max: 1000 },
  { label: "₹1000+", min: 1000, max: Infinity },
];

export default function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [activeSport, setActiveSport] = useState(searchParams.get("sport") || "");
  const [activeType, setActiveType] = useState<"" | "Indoor" | "Outdoor">("");
  const [activePriceRange, setActivePriceRange] = useState<number | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [searchText, setSearchText] = useState(searchParams.get("location") || "");

  const toggleWishlist = (id: number) =>
    setWishlist((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const filtered = venues.filter((v) => {
    if (activeSport && !v.sports.map((s) => s.toLowerCase()).includes(activeSport.toLowerCase())) return false;
    if (activeType && v.type !== activeType) return false;
    if (activePriceRange !== null) {
      const range = priceRanges[activePriceRange];
      if (v.pricePerHour < range.min || v.pricePerHour > range.max) return false;
    }
    if (v.rating < minRating) return false;
    if (searchText && !v.name.toLowerCase().includes(searchText.toLowerCase()) && !v.location.toLowerCase().includes(searchText.toLowerCase())) return false;
    return true;
  });

  const clearFilters = () => {
    setActiveSport("");
    setActiveType("");
    setActivePriceRange(null);
    setMinRating(0);
  };

  const hasFilters = activeSport || activeType || activePriceRange !== null || minRating > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Sub-header */}
      <div className="bg-white border-b border-border py-4 px-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <div className="flex-1 flex items-center gap-3 bg-muted rounded-xl px-4 py-2.5">
            <SearchIcon size={16} className="text-muted-foreground shrink-0" />
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search venues, locations..."
              className="flex-1 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none bg-transparent"
            />
            {searchText && (
              <button onClick={() => setSearchText("")}>
                <X size={14} className="text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>

          {/* Sport chips */}
          <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <button
              onClick={() => setActiveSport("")}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                !activeSport ? "bg-primary text-primary-foreground border-primary" : "bg-white border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              All
            </button>
            {sports.slice(0, 6).map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSport(activeSport === s.id ? "" : s.id)}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  activeSport === s.id ? "bg-primary text-primary-foreground border-primary" : "bg-white border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          {/* View toggle + filter */}
          <div className="flex gap-2 shrink-0">
            <div className="flex items-center bg-muted rounded-xl p-1">
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              >
                <List size={16} />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "map" ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"}`}
              >
                <Map size={16} />
              </button>
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                filtersOpen || hasFilters ? "bg-primary text-primary-foreground border-primary" : "bg-white border-border text-foreground"
              }`}
            >
              <SlidersHorizontal size={15} />
              Filters
              {hasFilters && <span className="w-4 h-4 bg-white/30 rounded-full text-[10px] font-black flex items-center justify-center">!</span>}
            </button>
          </div>
        </div>

        {/* Expanded filters */}
        {filtersOpen && (
          <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Type */}
            <div>
              <p className="text-xs font-black text-foreground uppercase tracking-wider mb-2">Venue Type</p>
              <div className="flex gap-2">
                {(["", "Indoor", "Outdoor"] as const).map((t) => (
                  <button
                    key={t || "all"}
                    onClick={() => setActiveType(t)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      activeType === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {t || "Any"}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div>
              <p className="text-xs font-black text-foreground uppercase tracking-wider mb-2">Price Range</p>
              <div className="flex flex-wrap gap-2">
                {priceRanges.map((r, i) => (
                  <button
                    key={r.label}
                    onClick={() => setActivePriceRange(activePriceRange === i ? null : i)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      activePriceRange === i ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <p className="text-xs font-black text-foreground uppercase tracking-wider mb-2">Min Rating</p>
              <div className="flex gap-2">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(minRating === r ? 0 : r)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      minRating === r && r > 0 ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {r === 0 ? "Any" : `${r}★+`}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <div className="sm:col-span-3">
                <button onClick={clearFilters} className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1">
                  <X size={12} /> Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-5 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-black text-foreground">
              {filtered.length} {filtered.length === 1 ? "venue" : "venues"} found
            </h1>
            {searchText && <p className="text-sm text-muted-foreground">in &ldquo;{searchText}&rdquo;</p>}
          </div>
          <select className="text-sm font-semibold text-foreground border border-border rounded-xl px-4 py-2 outline-none bg-white cursor-pointer">
            <option>Sort: Recommended</option>
            <option>Sort: Rating (High to Low)</option>
            <option>Sort: Price (Low to High)</option>
            <option>Sort: Distance</option>
          </select>
        </div>

        {viewMode === "map" ? (
          <div className="bg-muted rounded-2xl h-96 flex items-center justify-center border border-border">
            <div className="text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <p className="text-sm font-bold text-foreground mb-1">Map View</p>
              <p className="text-xs text-muted-foreground">Interactive map coming soon</p>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-black text-foreground mb-2">No venues found</h3>
            <p className="text-muted-foreground text-sm mb-6">Try adjusting your filters or search in a different area.</p>
            <button onClick={clearFilters} className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-xl hover:bg-[#0d6e3c] transition-all">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((venue) => (
              <div
                key={venue.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => navigate(`/venue/${venue.id}`)}
              >
                <div className="relative h-52 bg-muted overflow-hidden">
                  <img
                    src={venue.images[0]}
                    alt={venue.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <div className="flex gap-2">
                      {venue.badge && (
                        <span className="bg-white/95 backdrop-blur-sm text-primary text-[10px] font-black px-3 py-1 rounded-full shadow-sm">
                          {venue.badge}
                        </span>
                      )}
                      <span className="bg-white/95 backdrop-blur-sm text-foreground text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                        {venue.type}
                      </span>
                    </div>
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
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-bold text-foreground text-[15px] leading-tight">{venue.name}</h3>
                    <span className="text-lg shrink-0 leading-none mt-0.5">{venue.sportIcon}</span>
                  </div>
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
                  <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                    {venue.amenities.slice(0, 3).map((a) => (
                      <span key={a} className="text-[10px] font-bold bg-secondary text-primary px-2 py-0.5 rounded-full">{a}</span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/venue/${venue.id}`); }}
                    disabled={!venue.available}
                    className={`w-full text-sm font-bold py-2.5 rounded-xl transition-all duration-200 ${
                      venue.available
                        ? "bg-primary text-primary-foreground hover:bg-[#0d6e3c] hover:scale-[1.02] active:scale-95"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                  >
                    {venue.available ? "View & Book" : "Fully Booked"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
