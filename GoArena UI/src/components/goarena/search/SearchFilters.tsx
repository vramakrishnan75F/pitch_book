import { useState } from "react";
import type { Sport } from "../types";

// ─── SearchFilters ────────────────────────────────────────────────────────────
// Search bar + sport chips + expandable filter panel.
// Calls onSearch / onFilterChange — parent applies them to the venue list.

export type FilterValues = {
  query: string;
  sportId: string;
  venueType: "any" | "Indoor" | "Outdoor";
  priceRange: [number, number] | null;
  minRating: number;
  viewMode: "list" | "map";
};

export type SearchFiltersProps = {
  sports: Sport[];
  filters: FilterValues;           // controlled from parent
  onFilterChange: (next: Partial<FilterValues>) => void;
  onClearFilters: () => void;
};

export function SearchFilters({ sports, filters, onFilterChange, onClearFilters }: SearchFiltersProps) {
  const [expanded, setExpanded] = useState(false);
  const hasActiveFilters =
    !!filters.sportId || filters.venueType !== "any" || !!filters.priceRange || filters.minRating > 0;

  const PRICE_RANGES: { label: string; range: [number, number] }[] = [
    { label: "Under ₹300", range: [0, 300] },
    { label: "₹300 – ₹600", range: [300, 600] },
    { label: "₹600 – ₹1000", range: [600, 1000] },
    { label: "₹1000+", range: [1000, 999999] },
  ];

  return (
    <div className="bg-card border-b border-border py-4 px-5">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        {/* Search input */}
        <div className="flex-1 flex items-center gap-3 bg-muted rounded-xl px-4 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground shrink-0">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            value={filters.query}
            onChange={(e) => onFilterChange({ query: e.target.value })}
            placeholder="Search venues, locations..."
            className="flex-1 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none bg-transparent"
          />
          {filters.query && (
            <button onClick={() => onFilterChange({ query: "" })} aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-muted-foreground hover:text-foreground"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          )}
        </div>

        {/* Sport chips */}
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <button
            onClick={() => onFilterChange({ sportId: "" })}
            className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              !filters.sportId ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/40"
            }`}
          >
            All
          </button>
          {sports.slice(0, 6).map((s) => (
            <button
              key={s.id}
              onClick={() => onFilterChange({ sportId: filters.sportId === s.id ? "" : s.id })}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                filters.sportId === s.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>

        {/* View toggle + filter toggle */}
        <div className="flex gap-2 shrink-0">
          <div className="flex items-center bg-muted rounded-xl p-1">
            {(["list", "map"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => onFilterChange({ viewMode: mode })}
                aria-label={`${mode} view`}
                className={`p-2 rounded-lg transition-colors ${filters.viewMode === mode ? "bg-card shadow-sm text-foreground" : "text-muted-foreground"}`}
              >
                {mode === "list" ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
              expanded || hasActiveFilters ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border text-foreground"
            }`}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            Filters
            {hasActiveFilters && (
              <span className="w-4 h-4 bg-white/30 rounded-full text-[10px] font-black flex items-center justify-center">!</span>
            )}
          </button>
        </div>
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="max-w-7xl mx-auto mt-4 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Venue type */}
          <div>
            <p className="text-xs font-black text-foreground uppercase tracking-wider mb-2">Venue Type</p>
            <div className="flex gap-2">
              {(["any", "Indoor", "Outdoor"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => onFilterChange({ venueType: t })}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all capitalize ${
                    filters.venueType === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {t === "any" ? "Any" : t}
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-xs font-black text-foreground uppercase tracking-wider mb-2">Price Range</p>
            <div className="flex flex-wrap gap-2">
              {PRICE_RANGES.map((r) => {
                const active = filters.priceRange?.[0] === r.range[0] && filters.priceRange?.[1] === r.range[1];
                return (
                  <button
                    key={r.label}
                    onClick={() => onFilterChange({ priceRange: active ? null : r.range })}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                      active ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Min rating */}
          <div>
            <p className="text-xs font-black text-foreground uppercase tracking-wider mb-2">Min Rating</p>
            <div className="flex gap-2">
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => onFilterChange({ minRating: filters.minRating === r ? 0 : r })}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    filters.minRating === r && r > 0 ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"
                  }`}
                >
                  {r === 0 ? "Any" : `${r}★+`}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="sm:col-span-3">
              <button onClick={onClearFilters} className="text-xs font-bold text-destructive hover:opacity-80 flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
