import type { Sport } from "../types";

// ─── HeroSection ──────────────────────────────────────────────────────────────
// Full-bleed hero with search bar. Calls onSearch — parent handles the query.

export type SearchParams = {
  location: string;
  sportId: string;
  date: string;
};

export type HeroSectionProps = {
  backgroundImageUrl: string;
  liveVenueCount: number;
  sports: Sport[];
  defaultDate?: string;
  stats?: { value: string; label: string }[];
  onSearch: (params: SearchParams) => void;
};

export function HeroSection({
  backgroundImageUrl,
  liveVenueCount,
  sports,
  defaultDate = "",
  stats = [],
  onSearch,
}: HeroSectionProps) {
  // Local UI state only — form field values
  const [location, setLocation] = useState("");
  const [sportId, setSportId] = useState("");
  const [date, setDate] = useState(defaultDate);

  return (
    <section className="relative h-[88vh] min-h-[580px] flex items-center overflow-hidden bg-[#0a1a10]">
      <img
        src={backgroundImageUrl}
        alt="Sports venue"
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#15202B]/50 via-[#15202B]/10 to-[#15202B]/85 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 w-full pt-8">
        <div className="max-w-3xl">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full mb-7">
            <span className="w-2 h-2 bg-[#32C766] rounded-full animate-pulse" />
            {liveVenueCount}+ venues available today
          </div>

          <h1 className="text-5xl md:text-[72px] font-black text-white leading-[1.03] tracking-tight mb-4">
            Find Your<br />
            <span className="text-[#32C766]">Next Game.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/68 font-medium mb-10 max-w-xl leading-relaxed">
            Discover and book premium sports venues near you.
          </p>

          {/* Search bar */}
          <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary shrink-0">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Your city or area"
                className="flex-1 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none bg-transparent"
              />
            </div>

            <div className="hidden md:block w-px bg-border my-2" />

            <div className="flex-1 flex items-center gap-3 px-4 py-3">
              <select
                value={sportId}
                onChange={(e) => setSportId(e.target.value)}
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
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary shrink-0">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 text-sm font-semibold text-foreground outline-none bg-transparent cursor-pointer"
              />
            </div>

            <button
              onClick={() => onSearch({ location, sportId, date })}
              className="bg-primary text-primary-foreground font-bold text-sm px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-200 hover:scale-[1.03] active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Floating stats */}
      {stats.length > 0 && (
        <div className="absolute bottom-10 right-8 hidden md:flex gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-right">
              <div className="text-2xl font-black text-white">{s.value}</div>
              <div className="text-[10px] text-white/55 font-bold uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

// useState needs to be imported — it's local UI state (form fields)
import { useState } from "react";
