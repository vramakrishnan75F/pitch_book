import { useState } from "react";

// ─── SlotCalendar ─────────────────────────────────────────────────────────────
// 7-day week strip calendar. Local state = week offset + selected date display.
// onDateSelect is called with the chosen Date — parent fetches slots for it.

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type SlotCalendarProps = {
  today: Date;
  selectedDate: Date;
  maxWeeksAhead?: number;          // default 4
  onDateSelect: (date: Date) => void;
  className?: string;
};

function generateWeek(base: Date, offset: number): Date[] {
  const start = new Date(base);
  start.setDate(base.getDate() + offset * 7);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export function SlotCalendar({
  today,
  selectedDate,
  maxWeeksAhead = 4,
  onDateSelect,
  className = "",
}: SlotCalendarProps) {
  const [weekOffset, setWeekOffset] = useState(0);
  const weekDates = generateWeek(today, weekOffset);

  return (
    <div className={`bg-card border border-border rounded-2xl p-5 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-black text-foreground">
          {MONTHS[weekDates[0].getMonth()]} {weekDates[0].getFullYear()}
        </h2>
        <div className="flex gap-1">
          <button
            onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
            disabled={weekOffset === 0}
            aria-label="Previous week"
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 disabled:opacity-40 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button
            onClick={() => setWeekOffset((w) => Math.min(maxWeeksAhead - 1, w + 1))}
            disabled={weekOffset >= maxWeeksAhead - 1}
            aria-label="Next week"
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 disabled:opacity-40 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-[10px] font-black text-muted-foreground uppercase tracking-wider pb-2">
            {d}
          </div>
        ))}
        {weekDates.map((date) => {
          const isPast = date < today && date.toDateString() !== today.toDateString();
          const isSelected = date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === today.toDateString();
          return (
            <button
              key={date.toDateString()}
              onClick={() => !isPast && onDateSelect(date)}
              disabled={isPast}
              aria-label={`${date.getDate()} ${MONTHS[date.getMonth()]}`}
              aria-pressed={isSelected}
              className={`flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-200 ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : isPast
                  ? "text-muted-foreground/40 cursor-not-allowed"
                  : "hover:bg-secondary text-foreground"
              }`}
            >
              <span className="text-xs font-bold">{date.getDate()}</span>
              {isToday && (
                <span className={`w-1 h-1 rounded-full mt-0.5 ${isSelected ? "bg-primary-foreground/70" : "bg-primary"}`} />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-3 pt-3 border-t border-border text-center text-sm font-semibold text-foreground">
        {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]} {selectedDate.getFullYear()}
        {selectedDate.toDateString() === today.toDateString() && (
          <span className="ml-2 text-[10px] font-black text-primary bg-secondary px-2 py-0.5 rounded-full">Today</span>
        )}
      </div>
    </div>
  );
}
