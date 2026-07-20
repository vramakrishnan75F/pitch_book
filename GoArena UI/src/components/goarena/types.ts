// ─── GoArena Presentation Layer — Shared Types ───────────────────────────────
// All data flows in from the parent page via props.
// Components never fetch, never navigate, never own application state.

export type Sport = {
  id: string;
  label: string;
  icon: React.ReactNode; // pass your Icon component
  venueCount: string;    // e.g. "240+"
};

export type Amenity = {
  id: string;
  label: string;
  icon?: React.ReactNode;
};

export type Review = {
  id: string;
  authorName: string;
  authorAvatar?: string; // URL or initials
  rating: number;        // 1–5
  date: string;
  comment: string;
};

export type VenueSummary = {
  id: string;
  name: string;
  location: string;
  distanceLabel: string;  // "1.2 km"
  sports: string[];
  sportIcon: React.ReactNode;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  currency: string;       // "₹"
  imageUrl: string;
  badgeLabel?: string;    // "Top Rated" | "Trending" | "Popular"
  isAvailable: boolean;
  isFavourited: boolean;
  amenityLabels: string[];
  type: "Indoor" | "Outdoor";
};

export type VenueDetail = VenueSummary & {
  address: string;
  images: string[];
  description: string;
  rules: string[];
  amenities: Amenity[];
  reviews: Review[];
  averageRating: number;
  availableSports: Sport[];
};

export type TimeSlot = {
  time: string;       // "09:00"
  label: string;      // "9:00 AM"
  isBooked: boolean;
  isSelected: boolean;
};

export type TimeSection = {
  id: string;
  label: "Morning" | "Afternoon" | "Evening" | "Night";
  range: string;      // "6 AM – 12 PM"
  slots: TimeSlot[];
};

export type BookingDetails = {
  bookingId?: string;
  venueName: string;
  venueLocation: string;
  venueImageUrl: string;
  sport: string;
  sportIcon: React.ReactNode;
  date: string;
  timeSlot: string;
  duration: number;     // hours
  currency: string;
  basePrice: number;
  platformFee: number;
  discount: number;
  gst: number;
  total: number;
  appliedCoupon?: string;
};

export type BookingListItem = {
  id: string;
  venueName: string;
  venueLocation: string;
  venueImageUrl: string;
  sport: string;
  sportIcon: React.ReactNode;
  date: string;
  time: string;
  duration: number;
  currency: string;
  total: number;
  status: "upcoming" | "completed" | "cancelled";
};

export type PaymentMethod = "upi" | "card" | "netbanking" | "wallet";

export type UpiApp = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export type Bank = {
  id: string;
  name: string;
};

export type Wallet = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export type ProfileStats = {
  label: string;
  value: string;
  icon: React.ReactNode;
};

export type SettingsItem = {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  destructive?: boolean;
  hideChevron?: boolean;
};

export type TournamentCard = {
  id: string;
  title: string;
  sport: string;
  dateRange: string;
  teamsLabel: string;
  prizeLabel: string;
  imageUrl: string;
  registrationTag: string;  // "Registration Open" | "Closing Soon"
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  initials: string;
  quote: string;
  rating: number;
};

export type HowItWorksStep = {
  step: string;       // "01"
  icon: React.ReactNode;
  title: string;
  description: string;
};
