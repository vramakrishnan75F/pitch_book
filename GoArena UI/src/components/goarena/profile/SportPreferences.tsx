import type { Sport } from "../types";

// ─── SportPreferences ─────────────────────────────────────────────────────────
// Sport chip selector for the profile page.
// onToggle — parent updates the user's sport preference list.

export type SportPreferencesProps = {
  sports: Sport[];
  selected: string[];           // controlled from parent (array of sport IDs)
  isEditing: boolean;
  onToggle: (sportId: string) => void;
  className?: string;
};

export function SportPreferences({
  sports,
  selected,
  isEditing,
  onToggle,
  className = "",
}: SportPreferencesProps) {
  return (
    <div className={`bg-card border border-border rounded-2xl p-5 ${className}`}>
      <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-4">
        Sports Preferences
      </h2>
      <div className="flex flex-wrap gap-2">
        {sports.map((sport) => {
          const isActive = selected.includes(sport.id);
          return (
            <button
              key={sport.id}
              onClick={() => isEditing && onToggle(sport.id)}
              disabled={!isEditing}
              aria-pressed={isActive}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold border-2 transition-all duration-200 ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground"
              } ${isEditing ? "cursor-pointer hover:border-primary/60" : "cursor-default"}`}
            >
              {sport.icon} {sport.label}
            </button>
          );
        })}
      </div>
      {isEditing && (
        <p className="text-[11px] text-muted-foreground mt-3">Tap sports to toggle your preferences</p>
      )}
    </div>
  );
}
