// ─── SearchEmptyState ─────────────────────────────────────────────────────────
// Shown when the search/filter returns zero venues.

export type SearchEmptyStateProps = {
  query?: string;
  onClearFilters: () => void;
  className?: string;
};

export function SearchEmptyState({ query, onClearFilters, className = "" }: SearchEmptyStateProps) {
  return (
    <div className={`py-20 text-center ${className}`}>
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-black text-foreground mb-2">No venues found</h3>
      {query && (
        <p className="text-sm text-muted-foreground mb-1">
          No results for <span className="font-bold text-foreground">&ldquo;{query}&rdquo;</span>
        </p>
      )}
      <p className="text-sm text-muted-foreground mb-6 max-w-xs mx-auto">
        Try adjusting your filters or searching a different area.
      </p>
      <button
        onClick={onClearFilters}
        className="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-xl hover:opacity-90 transition-all"
      >
        Clear Filters
      </button>
    </div>
  );
}
