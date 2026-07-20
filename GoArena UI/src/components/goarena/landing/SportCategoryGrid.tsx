import type { Sport } from "../types";

// ─── SportCategoryGrid ────────────────────────────────────────────────────────
// Horizontal scrollable sport chip row.
// onSportSelect is called when the user taps a chip — parent handles filtering.

export type SportCategoryGridProps = {
  sports: Sport[];
  activeSportId: string;          // controlled from parent
  onSportSelect: (sportId: string) => void;
  onViewAll?: () => void;
  className?: string;
};

export function SportCategoryGrid({
  sports,
  activeSportId,
  onSportSelect,
  onViewAll,
  className = "",
}: SportCategoryGridProps) {
  return (
    <section className={`py-12 bg-card border-b border-border ${className}`}>
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-black text-foreground">Browse by Sport</h2>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all duration-200"
            >
              View all
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          )}
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          {sports.map((sport) => {
            const isActive = activeSportId === sport.id;
            return (
              <button
                key={sport.id}
                onClick={() => onSportSelect(sport.id)}
                className={`flex-shrink-0 flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border-2 transition-all duration-200 hover:scale-105 ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary"
                }`}
              >
                <span className="text-2xl">{sport.icon}</span>
                <span className="text-xs font-bold whitespace-nowrap">{sport.label}</span>
                <span className={`text-[10px] font-bold ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {sport.venueCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
