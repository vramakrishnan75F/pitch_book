# Sprint 2.0 - Landing Migration

## Scope

- Migrated only the Landing screen presentation.
- No routing, hooks, services, repositories, payment logic, or API layer were replaced.
- Booking, Payment, Profile, Venue Detail, and Success presentation migrations are not started in this task.

## Step 1 - Screen mapping (Current app to Figma)

| Current app page/flow | Figma screen | Status | Notes |
|---|---|---|---|
| Home (`/`) | Landing | READY (migrated in this task) | Presentation updated using existing app primitives |
| Booking (`/book`) | SlotSelection + BookingSummary + Payment | READY (mapping only) | Current app combines these into one booking/payment flow page |
| Success (`/success`) | BookingSuccess | READY (mapping only) | Current app success page already uses payment completion state |
| Search | Search | NOT IN CURRENT APP ROUTES | Figma-only screen, future optional expansion |
| Venue Detail | VenueDetail | NOT IN CURRENT APP ROUTES | Future scope only |
| My Bookings | MyBookings | NOT IN CURRENT APP ROUTES | Future scope only |
| Profile | Profile | NOT IN CURRENT APP ROUTES | Future scope only |

## Step 2 - Migration matrix

| Current page | Figma screen | Status |
|---|---|---|
| Home | Landing | READY |
| Booking | Booking (SlotSelection/BookingSummary/Payment) | READY (next screen, not migrated now) |
| Success | Success | READY (next screen, not migrated now) |
| Venue Detail | Venue Detail | READY (future expansion only) |

## Step 3 - Logic inventory to preserve (source of truth)

### Home (`/`)

- Existing hook: `useHomeBooking`
- Existing services: none
- Existing repositories: none
- Existing API calls: none
- Current navigation: `navigate('/book', { state: { bookingData } })`
- Current state management: hook-local `selectedSlot`, `message`
- Current payment flow: none
- Preservation result: unchanged

### Booking (`/book`)

- Existing hook: `useBookingPayment`
- Existing services: `requestPaymentOrder`, `loadRazorpayScript`, `createRazorpayInstance`
- Existing repositories: `createOrder`
- Existing API calls: `POST /api/payment/create-order`
- Current navigation:
  - back/fallback to `/`
  - success navigation to `/success` with booking state
- Current state management:
  - route state: `bookingData`
  - hook-local form state: name, mobile, touched flags
  - hook-local payment state: processing/message
- Current payment flow:
  - validate form
  - create backend order
  - load Razorpay SDK
  - open checkout
  - handle dismiss/failure/success
- Preservation result: unchanged

### Success (`/success`)

- Existing hook: none
- Existing services: none
- Existing repositories: none
- Existing API calls: none
- Current navigation: `Link` back to `/`
- Current state management: route state read via `useLocation`
- Current payment flow: displays final payment/order details captured from Booking
- Preservation result: unchanged

## Landing migration implementation details

### Components reused

- Layout and theme
  - `AppLayout`
  - `ThemeProvider` (already in app root, reused as-is)
- Core UI
  - `PageHeader`
  - `Text`
  - `Button`
  - `InfoCard`
  - `SectionHeader`
  - `FieldError`
- Navigation and form primitives
  - `NavigationBar`
  - `Form`
  - `FormField`
  - `Label`
  - `TextInput`
- Status and skeleton
  - `StatusCard`
  - `StatusIllustration`
  - `SkeletonVenueCard`

### Components created

- `src/pages/Home.css`
  - Responsive styling for migrated Landing presentation sections.

### Components modified

- `src/pages/Home.tsx`
  - Presentation replaced with Figma-inspired Landing structure.
  - Existing `useHomeBooking` integration retained.
  - Existing slot-selection and Book Now flow retained.

### Logic preserved

- `handleBookNow` from `useHomeBooking` is still the sole booking entry action.
- Selected slot still comes from `useHomeBooking` and remains mandatory.
- Booking data payload and navigation state shape are unchanged.
- No changes to:
  - `App.tsx`
  - `main.tsx`
  - hooks
  - services
  - repositories
  - Razorpay payment logic
  - backend API layer

## Remaining work

- Migrate Booking presentation (without touching `useBookingPayment` and payment stack).
- Migrate Success presentation while preserving route-state rendering.
- Optional future route expansion for Search, Venue Detail, My Bookings, Profile using existing architecture patterns.
