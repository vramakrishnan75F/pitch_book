import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, ChevronRight, ArrowRight, Clock, Sun, Sunset, Moon } from "lucide-react";
import { useBooking } from "../app/BookingContext";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const TIME_SECTIONS = [
  {
    id: "morning",
    label: "Morning",
    icon: <Sun size={14} />,
    range: "6 AM – 12 PM",
    slots: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00"],
  },
  {
    id: "afternoon",
    label: "Afternoon",
    icon: <Sun size={14} />,
    range: "12 PM – 5 PM",
    slots: ["12:00", "13:00", "14:00", "15:00", "16:00"],
  },
  {
    id: "evening",
    label: "Evening",
    icon: <Sunset size={14} />,
    range: "5 PM – 9 PM",
    slots: ["17:00", "18:00", "19:00", "20:00"],
  },
  {
    id: "night",
    label: "Night",
    icon: <Moon size={14} />,
    range: "9 PM – 12 AM",
    slots: ["21:00", "22:00", "23:00"],
  },
];

// Deterministic "booked" slots for demo
const BOOKED_SLOTS: Record<string, string[]> = {
  "2025-08-03": ["09:00", "10:00", "17:00", "18:00"],
  "2025-08-04": ["08:00", "13:00", "19:00"],
  "2025-08-05": ["06:00", "07:00", "20:00"],
};

function formatSlot(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${displayH}:${m.toString().padStart(2, "0")} ${period}`;
}

function generateWeekDates(baseDate: Date) {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export default function SlotSelection() {
  const navigate = useNavigate();
  const { booking, setBooking } = useBooking();

  const today = new Date(2025, 7, 3); // Aug 3 2025
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [duration, setDuration] = useState(1);

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() + weekOffset * 7);
  const weekDates = generateWeekDates(weekStart);

  const dateKey = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
  const bookedSlots = BOOKED_SLOTS[dateKey] || [];

  const totalPrice = booking.pricePerHour * duration;
  const platformFee = Math.round(totalPrice * 0.05);
  const gst = Math.round((totalPrice + platformFee) * 0.18);
  const grandTotal = totalPrice + platformFee + gst;

  const handleProceed = () => {
    if (!selectedSlot) return;
    const formattedDate = `${selectedDate.getDate()} ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
    setBooking({
      date: formattedDate,
      slot: formatSlot(selectedSlot),
      duration,
    });
    navigate("/booking/summary");
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-foreground mb-1">Select a Slot</h1>
        <p className="text-sm text-muted-foreground">
          {booking.venueName} · {booking.sport}
        </p>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-border rounded-2xl p-5 mb-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-black text-foreground">
            {MONTHS[weekDates[0].getMonth()]} {weekDates[0].getFullYear()}
          </h2>
          <div className="flex gap-1">
            <button
              onClick={() => setWeekOffset((w) => Math.max(0, w - 1))}
              disabled={weekOffset === 0}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 disabled:opacity-40 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setWeekOffset((w) => Math.min(3, w + 1))}
              disabled={weekOffset === 3}
              className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 disabled:opacity-40 transition-all"
            >
              <ChevronRight size={16} />
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
            const isPast = date < today;
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === today.toDateString();
            return (
              <button
                key={date.toDateString()}
                onClick={() => !isPast && setSelectedDate(date)}
                disabled={isPast}
                className={`relative flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-200 ${
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : isPast
                    ? "text-muted-foreground/40 cursor-not-allowed"
                    : "hover:bg-secondary text-foreground"
                }`}
              >
                <span className="text-xs font-bold">{date.getDate()}</span>
                {isToday && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />
                )}
                {isToday && isSelected && (
                  <span className="w-1 h-1 rounded-full bg-white mt-0.5" />
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

      {/* Duration selector */}
      <div className="bg-white border border-border rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={16} className="text-primary" />
          <h2 className="text-base font-black text-foreground">Duration</h2>
        </div>
        <div className="flex gap-2">
          {[1, 1.5, 2, 3].map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                duration === d
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {d}h
            </button>
          ))}
        </div>
      </div>

      {/* Time slots */}
      <div className="space-y-4 mb-6">
        {TIME_SECTIONS.map((section) => (
          <div key={section.id} className="bg-white border border-border rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-muted-foreground">{section.icon}</div>
              <h3 className="text-sm font-black text-foreground">{section.label}</h3>
              <span className="text-xs text-muted-foreground">{section.range}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {section.slots.map((slot) => {
                const isBooked = bookedSlots.includes(slot);
                const isSelected = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() => !isBooked && setSelectedSlot(isSelected ? "" : slot)}
                    disabled={isBooked}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                        : isBooked
                        ? "border-muted bg-muted text-muted-foreground/50 cursor-not-allowed line-through"
                        : "border-border text-foreground hover:border-primary hover:text-primary hover:bg-secondary"
                    }`}
                  >
                    {formatSlot(slot)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mb-6 text-xs font-semibold text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-primary inline-block" />Selected</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded border-2 border-border inline-block" />Available</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-muted inline-block" />Booked</span>
      </div>

      {/* Price summary + CTA */}
      <div className="bg-white border border-border rounded-2xl p-5">
        <h3 className="text-sm font-black text-foreground mb-4">Price Summary</h3>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between text-muted-foreground">
            <span>₹{booking.pricePerHour} × {duration}h</span>
            <span className="font-semibold text-foreground">₹{totalPrice}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Platform fee (5%)</span>
            <span className="font-semibold text-foreground">₹{platformFee}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>GST (18%)</span>
            <span className="font-semibold text-foreground">₹{gst}</span>
          </div>
          <div className="flex justify-between font-black text-foreground border-t border-border pt-2 mt-2">
            <span>Total</span>
            <span className="text-primary text-base">₹{grandTotal}</span>
          </div>
        </div>
        <button
          onClick={handleProceed}
          disabled={!selectedSlot}
          className={`w-full font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
            selectedSlot
              ? "bg-primary text-primary-foreground hover:bg-[#0d6e3c] hover:scale-[1.02] active:scale-95"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {selectedSlot ? (
            <>Proceed to Summary <ArrowRight size={16} /></>
          ) : (
            "Select a time slot to continue"
          )}
        </button>
      </div>
    </div>
  );
}
