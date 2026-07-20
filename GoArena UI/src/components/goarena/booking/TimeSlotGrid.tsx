import type { TimeSection } from "../types";

// ─── TimeSlotGrid ─────────────────────────────────────────────────────────────
// Renders Morning / Afternoon / Evening / Night sections with slot chips.
// onSlotSelect called with the slot's time string — parent updates selected state.

export type TimeSlotGridProps = {
  sections: TimeSection[];
  selectedSlot: string;            // controlled from parent
  onSlotSelect: (time: string) => void;
  className?: string;
};

export function TimeSlotGrid({ sections, selectedSlot, onSlotSelect, className = "" }: TimeSlotGridProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {sections.map((section) => (
        <div key={section.id} className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm font-black text-foreground">{section.label}</h3>
            <span className="text-xs text-muted-foreground">{section.range}</span>
          </div>

          {section.slots.length === 0 ? (
            <p className="text-xs text-muted-foreground italic">No slots in this period</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {section.slots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => !slot.isBooked && onSlotSelect(slot.isSelected ? "" : slot.time)}
                  disabled={slot.isBooked}
                  aria-pressed={slot.isSelected}
                  aria-label={`${slot.label}${slot.isBooked ? " — unavailable" : ""}`}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all duration-200 ${
                    slot.isSelected
                      ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : slot.isBooked
                      ? "border-muted bg-muted text-muted-foreground/50 cursor-not-allowed line-through"
                      : "border-border text-foreground hover:border-primary hover:text-primary hover:bg-secondary"
                  }`}
                >
                  {slot.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Legend */}
      <div className="flex items-center gap-5 text-xs font-semibold text-muted-foreground px-1">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-primary inline-block" />Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border-2 border-border inline-block" />Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-muted inline-block" />Booked
        </span>
      </div>
    </div>
  );
}
