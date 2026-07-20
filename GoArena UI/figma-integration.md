# GoArena — Figma Make Integration Guide

> **Purpose:** Plug-and-play presentational React components for the GoArena production app.  
> These components contain **no routing, no data fetching, no business logic, and no API calls**.  
> Every interaction is surfaced as a typed callback prop. Your existing architecture owns all state, navigation, and data.

---

## Directory structure

```
src/components/goarena/
├── types.ts                        ← Shared TypeScript types (import from here)
│
├── venue/
│   ├── VenueCard.tsx               ← Search result / listing card
│   ├── VenueGallery.tsx            ← Image carousel with thumbnails
│   ├── VenueDetailHeader.tsx       ← Name, address, quick-stat chips
│   ├── VenueAmenities.tsx          ← Amenity icon grid
│   ├── VenueReviews.tsx            ← Rating distribution + review cards
│   └── BookingPanel.tsx            ← Desktop sticky booking widget + mobile bottom bar
│
├── landing/
│   ├── HeroSection.tsx             ← Search form hero
│   ├── SportCategoryGrid.tsx       ← Horizontal sport chip scroll
│   ├── HowItWorksSection.tsx       ← 3-step explainer strip
│   └── TournamentSection.tsx       ← Tournament cards row
│
├── search/
│   ├── SearchFilters.tsx           ← Filter sidebar / sheet
│   └── SearchEmptyState.tsx        ← No-results illustration
│
├── booking/
│   ├── SlotCalendar.tsx            ← Date picker with week navigation
│   ├── TimeSlotGrid.tsx            ← Morning/Afternoon/Evening/Night slots
│   ├── CouponInput.tsx             ← Coupon code entry + validation feedback
│   └── PriceBreakdown.tsx          ← Line-item fee summary
│
├── payment/
│   ├── PaymentMethodPanel.tsx      ← UPI / Card / Net Banking / Wallet tabs
│   └── SecureBadge.tsx             ← SSL + Razorpay trust strip
│
├── status/
│   ├── EmptyState.tsx              ← Generic empty state + preset exports
│   ├── BookingSuccessScreen.tsx    ← Confetti + booking confirmation
│   └── PaymentStatusScreens.tsx    ← PaymentFailedScreen, PaymentCancelledScreen
│
├── bookings/
│   └── BookingListItem.tsx         ← Single booking card (upcoming/completed/cancelled)
│
├── profile/
│   ├── ProfileHeader.tsx           ← Avatar, stats grid, edit/save toggle
│   ├── SportPreferences.tsx        ← Sport chip selector (controlled)
│   └── SettingsList.tsx            ← Settings rows with chevrons
│
└── skeletons/
    └── Skeletons.tsx               ← VenueCardSkeleton, BookingListItemSkeleton, etc.
```

---

## Component reference

### `types.ts` — shared types

Import all shared types from `src/components/goarena/types.ts`. Key types:

| Type | Used by |
|---|---|
| `Sport` | HeroSection, SportCategoryGrid, BookingPanel, SportPreferences |
| `Amenity` | VenueAmenities |
| `Review` | VenueReviews |
| `VenueSummary` | VenueCard |
| `VenueDetail` | VenueDetailHeader, VenueGallery, VenueAmenities, VenueReviews, BookingPanel |
| `TimeSlot` / `TimeSection` | TimeSlotGrid |
| `BookingDetails` | BookingSuccessScreen |
| `BookingListItem` | BookingListItem |
| `PaymentMethod` / `UpiApp` / `Bank` / `Wallet` | PaymentMethodPanel |
| `ProfileStats` | ProfileHeader |
| `SettingsItem` | SettingsList |
| `TournamentCard` | TournamentSection |
| `HowItWorksStep` | HowItWorksSection |
| `PriceRow` | PriceBreakdown |

---

### Landing page components

#### `HeroSection`

```tsx
import { HeroSection } from "@/components/goarena/landing/HeroSection";

<HeroSection
  backgroundImageUrl="https://images.unsplash.com/photo-..."
  liveVenueCount={240}
  sports={sports}              // Sport[]
  defaultDate="2026-07-20"    // optional ISO string
  stats={[                    // optional, shown below search bar
    { label: "Venues", value: "240+" },
    { label: "Cities", value: "12" },
    { label: "Bookings/day", value: "1,800+" },
  ]}
  onSearch={({ location, sportId, date }) => {
    // navigate to search with query params
    router.push(`/search?location=${location}&sport=${sportId}&date=${date}`);
  }}
/>
```

**Local state owned:** location input, sportId select, date input (form fields only).

---

#### `SportCategoryGrid`

```tsx
<SportCategoryGrid
  sports={sports}
  activeSportId={activeSport}
  onSportSelect={(sportId) => setActiveSport(sportId)}
  onViewAll={() => router.push("/search")}
/>
```

**Fully controlled.** Parent owns `activeSportId`.

---

#### `HowItWorksSection`

```tsx
<HowItWorksSection
  steps={[
    { step: 1, title: "Pick a Sport", description: "Choose from 15+ sports." },
    { step: 2, title: "Select a Slot", description: "Pick date, time and duration." },
    { step: 3, title: "Pay & Play", description: "Instant confirmation, zero hassle." },
  ]}
/>
```

Static — no callbacks.

---

#### `TournamentSection`

```tsx
<TournamentSection
  tournaments={tournaments}
  onRegister={(id) => router.push(`/tournaments/${id}/register`)}
  onViewAll={() => router.push("/tournaments")}
/>
```

---

### Venue components

#### `VenueCard`

```tsx
<VenueCard
  venue={venueSummary}
  onVenueClick={(id) => router.push(`/venue/${id}`)}
  onFavouriteToggle={(id) => dispatch(toggleFavourite(id))}
  variant="default"           // "default" | "compact"
/>
```

---

#### `VenueGallery`

```tsx
<VenueGallery
  images={venue.images}       // string[] of URLs
  venueName={venue.name}
  badgeLabel="Indoor"
  isFavourited={isFav}
  onFavouriteToggle={() => dispatch(toggleFavourite(venue.id))}
/>
```

**Local state owned:** `activeIndex` (gallery slide) only.

---

#### `VenueDetailHeader`

```tsx
<VenueDetailHeader
  name={venue.name}
  address={venue.address}
  sports={venue.sports}
  sportIcon={venue.primarySportIcon}
  type="Indoor"
  rating={venue.rating}
  reviewCount={venue.reviewCount}
  distanceLabel="2.4 km away"
  pricePerHour={venue.pricePerHour}
  currency="₹"
  isAvailable={venue.isAvailable}
/>
```

---

#### `BookingPanel` + `BookingPanelMobile`

```tsx
// Desktop sticky sidebar
<BookingPanel
  pricePerHour={venue.pricePerHour}
  currency="₹"
  rating={venue.rating}
  reviewCount={venue.reviewCount}
  availableSports={venue.sports}
  selectedSport={selectedSport}
  isAvailable={venue.isAvailable}
  onSportChange={(sport) => setSelectedSport(sport)}
  onBookNow={() => router.push(`/booking/slots?venueId=${venue.id}`)}
/>

// Mobile sticky bar (render conditionally at bottom of page)
<BookingPanelMobile
  pricePerHour={venue.pricePerHour}
  currency="₹"
  isAvailable={venue.isAvailable}
  onBookNow={() => router.push(`/booking/slots?venueId=${venue.id}`)}
/>
```

---

### Search components

#### `SearchFilters`

```tsx
import type { FilterValues } from "@/components/goarena/search/SearchFilters";

const [filters, setFilters] = useState<FilterValues>({
  query: "",
  sportId: "",
  venueType: "all",
  priceRange: "",
  minRating: 0,
  viewMode: "list",
});

<SearchFilters
  sports={sports}
  filters={filters}
  onFilterChange={(partial) => setFilters(f => ({ ...f, ...partial }))}
  onClearFilters={() => setFilters(defaultFilters)}
/>
```

**Local state owned:** `expanded` (filter panel open/closed).

---

#### `SearchEmptyState`

```tsx
<SearchEmptyState
  query={filters.query}
  onClearFilters={handleClearFilters}
/>
```

---

### Booking flow components

#### `SlotCalendar`

```tsx
<SlotCalendar
  today={new Date()}
  selectedDate={selectedDate}
  maxWeeksAhead={4}
  onDateSelect={(date) => setSelectedDate(date)}
/>
```

**Local state owned:** `weekOffset` (calendar page) only.

---

#### `TimeSlotGrid`

Fully controlled — parent owns `selectedSlot`.

```tsx
// Build sections from your API response
const sections: TimeSection[] = [
  {
    label: "Morning",
    icon: "🌅",
    slots: [
      { time: "06:00", available: true },
      { time: "07:00", available: false },
      ...
    ],
  },
  ...
];

<TimeSlotGrid
  sections={sections}
  selectedSlot={selectedSlot}
  onSlotSelect={(time) => setSelectedSlot(time)}
/>
```

---

#### `CouponInput`

```tsx
<CouponInput
  appliedCoupon={appliedCoupon}    // null | string
  discountPercent={discountPct}    // 0 | 10 | 20 | 50 ...
  errorMessage={couponError}       // optional error string
  hint="Try PLAY10 or ARENA20"
  onApplyCoupon={async (code) => {
    const result = await validateCoupon(code);
    if (result.valid) setAppliedCoupon(code);
    else setCouponError("Invalid coupon code");
  }}
  onRemoveCoupon={() => {
    setAppliedCoupon(null);
    setCouponError(undefined);
  }}
/>
```

**Local state owned:** `code` input field only.

---

#### `PriceBreakdown`

```tsx
<PriceBreakdown
  currency="₹"
  rows={[
    { label: "Base price (2h)", amount: 600 },
    { label: "Platform fee (5%)", amount: 30 },
    { label: "GST (18%)", amount: 113.4 },
    { label: "Coupon PLAY10", amount: -60, isDiscount: true },
  ]}
  total={683.40}
/>
```

---

### Payment components

#### `PaymentMethodPanel`

```tsx
import type { PaymentPayload } from "@/components/goarena/payment/PaymentMethodPanel";

<PaymentMethodPanel
  upiApps={[
    { id: "gpay", label: "Google Pay", icon: <GPayIcon /> },
    { id: "phonepe", label: "PhonePe", icon: <PhonePeIcon /> },
  ]}
  banks={[
    { id: "sbi", label: "State Bank of India" },
    { id: "hdfc", label: "HDFC Bank" },
  ]}
  wallets={[
    { id: "paytm", label: "Paytm", icon: <PaytmIcon /> },
  ]}
  isProcessing={isPaymentLoading}
  totalLabel="₹683"
  onPayNow={async (method, payload: PaymentPayload) => {
    // payload discriminated union: upi_app | upi_id | card | netbanking | wallet
    await initiatePayment(method, payload);
  }}
/>
```

**Local state owned:** all form field values and selected method tab.

---

#### `SecureBadge`

```tsx
<SecureBadge />   // no props
```

---

### Status / feedback components

#### `BookingSuccessScreen`

```tsx
<BookingSuccessScreen
  booking={{
    bookingId: "GA-4X7K2P",
    venueName: "Elite Football Ground",
    sport: "Football",
    sportIcon: "⚽",
    address: "Koramangala, Bangalore",
    date: "20 Jul 2026",
    slot: "07:00",
    duration: 2,
    currency: "₹",
    total: 683,
  }}
  onViewBookings={() => router.push("/bookings")}
  onBookAgain={() => router.push("/search")}
  onGetDirections={() => openMaps(venue.coordinates)}
  onAddToCalendar={() => addToCalendar(booking)}
  onShare={() => navigator.share({ title: "My GoArena Booking", url: shareUrl })}
  onDownloadReceipt={() => downloadPDF(booking.bookingId)}
/>
```

**Local state owned:** `visible` (entry animation trigger).

---

#### Empty state presets

```tsx
import {
  NoSearchResults,
  NoSlotsAvailable,
  EmptyBookings,
  OfflineScreen,
  BookingExpiredScreen,
} from "@/components/goarena/status/EmptyState";

<NoSearchResults
  onPrimary={handleClearFilters}
/>

<EmptyBookings
  onPrimary={() => router.push("/search")}
/>

<OfflineScreen
  onPrimary={() => window.location.reload()}
/>
```

---

#### `PaymentFailedScreen` / `PaymentCancelledScreen`

```tsx
import { PaymentFailedScreen, PaymentCancelledScreen }
  from "@/components/goarena/status/PaymentStatusScreens";

<PaymentFailedScreen
  errorMessage="Your bank declined the transaction."
  totalLabel="₹683"
  onRetry={retryPayment}
  onCancel={() => router.push("/booking/summary")}
/>

<PaymentCancelledScreen
  onGoBack={() => router.back()}
  onBrowseVenues={() => router.push("/search")}
/>
```

---

### My Bookings components

#### `BookingListItem`

```tsx
<BookingListItem
  booking={booking}
  onCancel={(id) => dispatch(cancelBooking(id))}
  onRebook={(id) => router.push(`/venue/${booking.venueId}`)}
  onDownloadInvoice={(id) => downloadInvoice(id)}
/>
```

Status-gated actions:
- `upcoming` → shows Cancel button (calls `onCancel`)
- `completed` → shows Rebook button (calls `onRebook`)
- All statuses → shows Invoice button (calls `onDownloadInvoice`)

---

### Profile components

#### `ProfileHeader`

```tsx
<ProfileHeader
  name="Arjun Mehta"
  memberSince="Jan 2024"
  rating={4.9}
  bookingCount={34}
  initials="AM"
  avatarUrl={user.avatarUrl}        // optional
  stats={[
    { label: "Bookings", value: "34", icon: <CalendarIcon /> },
    { label: "Sports", value: "5", icon: <SportIcon /> },
    { label: "Rating", value: "4.9", icon: <StarIcon /> },
    { label: "Since", value: "2024", icon: <ClockIcon /> },
  ]}
  isEditing={isEditing}
  onEdit={() => setIsEditing(true)}
  onSave={handleSaveProfile}
/>
```

---

#### `SportPreferences`

```tsx
<SportPreferences
  sports={allSports}
  selected={user.sportPreferences}    // string[] of sport IDs
  isEditing={isEditing}
  onToggle={(sportId) => dispatch(toggleSportPreference(sportId))}
/>
```

**Fully controlled.** Parent owns `selected`.

---

#### `SettingsList`

```tsx
<SettingsList
  items={[
    { id: "notifications", label: "Notifications", icon: <BellIcon />, badge: "3" },
    { id: "privacy",       label: "Privacy & Security", icon: <LockIcon /> },
    { id: "help",          label: "Help & Support", icon: <HelpIcon />, description: "FAQs, live chat" },
    { id: "logout",        label: "Log Out", icon: <LogOutIcon />, destructive: true, hideChevron: true },
  ]}
  onSettingClick={(id) => {
    if (id === "logout") authService.signOut();
    else router.push(`/settings/${id}`);
  }}
/>
```

---

### Skeleton loaders

```tsx
import {
  VenueCardSkeleton,
  VenueCardGridSkeleton,
  BookingListItemSkeleton,
  VenueDetailSkeleton,
  ProfileSkeleton,
} from "@/components/goarena/skeletons/Skeletons";

{isLoading ? <VenueCardGridSkeleton count={6} /> : <VenueList venues={venues} />}
```

---

## Required assets

| Asset | Source | Notes |
|---|---|---|
| Venue images | Your CDN / Unsplash | Passed as `string` URLs via props |
| Sport icons | Your icon system | Passed as `React.ReactNode` via `Sport.icon` |
| Amenity icons | Your icon system | Passed as `React.ReactNode` via `Amenity.icon` |
| Profile avatar | Your CDN | Optional — initials shown if absent |
| UPI app logos | Bundled in your app | Passed as `React.ReactNode` via `UpiApp.icon` |
| Wallet logos | Bundled in your app | Passed as `React.ReactNode` via `Wallet.icon` |
| Settings icons | Your icon system | Passed as `React.ReactNode` via `SettingsItem.icon` |

The component library has **no bundled image or icon assets** — all visual content flows through props.

---

## Design tokens

Components use Tailwind semantic classes tied to CSS custom properties. Define these in your global CSS:

```css
:root {
  --background:         #F7F9FA;
  --foreground:         #15202B;
  --card:               #ffffff;
  --card-foreground:    #15202B;
  --primary:            #0F7B45;
  --primary-foreground: #ffffff;
  --secondary:          #E8F5EE;
  --accent:             #FFC857;
  --muted:              #f1f5f9;
  --muted-foreground:   #64748b;
  --border:             #e2e8f0;
  --destructive:        #ef4444;
  --radius:             1rem;
}
```

These map to Tailwind classes: `bg-primary`, `text-foreground`, `bg-card`, `border-border`, `text-muted-foreground`, `bg-secondary`, `text-destructive`, `rounded-[var(--radius)]`.

Font: **Manrope** (Google Fonts). Add to your `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

Then set `font-family: 'Manrope', sans-serif` on `body` or via Tailwind `fontFamily` config.

---

## Integration steps

### 1. Copy the component directory

```bash
cp -r src/components/goarena/ YOUR_PROJECT/src/components/goarena/
```

### 2. Install peer dependencies (if not already present)

```bash
npm install tailwind-merge clsx
```

### 3. Wire up design tokens

Add the CSS custom properties above to your project's global stylesheet. If using Tailwind v4, add `@theme inline` mappings. If using Tailwind v3, extend your `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
      },
      // ... etc
    },
  },
}
```

### 4. Add Manrope font

Add the `<link>` tag above to your `index.html` or `_document.tsx`.

### 5. Map your data models to component types

Create adapter functions that transform your API response types into the component prop types defined in `types.ts`. Example:

```ts
import type { VenueSummary } from "@/components/goarena/types";
import type { ApiVenue } from "@/api/types";

function toVenueSummary(v: ApiVenue): VenueSummary {
  return {
    id: v.venue_id,
    name: v.display_name,
    address: v.location.address,
    rating: v.avg_rating,
    reviewCount: v.total_reviews,
    pricePerHour: v.price_per_hour,
    currency: "₹",
    sports: v.sport_list.map(s => ({ id: s.id, label: s.name, icon: s.emoji })),
    images: v.media.map(m => m.url),
    isAvailable: v.slots_available_today > 0,
    isFavourited: userFavourites.includes(v.venue_id),
    badgeLabel: v.indoor ? "Indoor" : "Outdoor",
  };
}
```

### 6. Replace placeholder callbacks with your router + dispatch

Swap every `() => console.log(...)` in sample usage above with your actual router calls (`router.push`, `navigate`, `useRouter`) and state updates (`dispatch`, `setState`, Zustand actions, React Query mutations).

### 7. No business logic lives in these components

- Coupon validation → your API endpoint
- Payment initiation → your payment SDK / gateway
- Booking confirmation → your backend + optimistic UI
- Slot availability → your real-time availability API
- Authentication / profile save → your auth service

---

## What NOT to replace

These components are UI-only overlays. Do **not** remove or replace:

- Your React Router / Next.js routing setup
- Your state management (Redux, Zustand, Context, React Query)
- Your payment gateway integration (Razorpay, Stripe, etc.)
- Your API client / data fetching layer
- Your authentication flow

---

## Local state boundaries (reference)

The following components own minimal local state that does **not** need to be lifted:

| Component | Local state |
|---|---|
| `VenueGallery` | `activeIndex` — current gallery slide |
| `SlotCalendar` | `weekOffset` — which week is visible |
| `SearchFilters` | `expanded` — filter panel open/closed |
| `CouponInput` | `code` — input field value |
| `HeroSection` | `location`, `sportId`, `date` — search form fields |
| `PaymentMethodPanel` | all form field values + selected method tab |
| `BookingSuccessScreen` | `visible` — entry animation flag |

All other state is **fully controlled** and must be managed by the parent.
