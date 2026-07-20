import { createContext, useContext, useState, type ReactNode } from "react";

export type BookingState = {
  venueId: number | null;
  venueName: string;
  sport: string;
  sportIcon: string;
  date: string;
  slot: string;
  duration: number;
  pricePerHour: number;
  bookingId: string;
};

type BookingContextType = {
  booking: BookingState;
  setBooking: (b: Partial<BookingState>) => void;
  resetBooking: () => void;
};

const defaultBooking: BookingState = {
  venueId: null,
  venueName: "",
  sport: "",
  sportIcon: "",
  date: "2025-08-03",
  slot: "",
  duration: 1,
  pricePerHour: 0,
  bookingId: "",
};

const BookingContext = createContext<BookingContextType>(null!);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBookingState] = useState<BookingState>(defaultBooking);

  function setBooking(partial: Partial<BookingState>) {
    setBookingState((prev) => ({ ...prev, ...partial }));
  }

  function resetBooking() {
    setBookingState(defaultBooking);
  }

  return (
    <BookingContext.Provider value={{ booking, setBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
