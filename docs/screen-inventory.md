# Screen Inventory

## Home
- File: `src/pages/Home.tsx`
- Purpose: Display venue details, available slots, and start booking.
- Business logic: Delegated to `useHomeBooking` hook.
- Reusable components used:
  - AppLayout
  - PageHeader
  - InfoCard
  - Text
  - SectionHeader
  - Button
  - FieldError
- Future Figma mapping:
  - Hero/Header block
  - Venue details card
  - Slot chips/buttons list
  - Primary CTA

## Booking
- File: `src/pages/Booking.tsx`
- Purpose: Capture name/mobile, trigger payment flow, route to success.
- Business logic: Delegated to `useBookingPayment` hook.
- Reusable components used:
  - BookingLayout
  - PageHeader
  - SectionHeader
  - InfoCard
  - Form
  - FormField
  - Label
  - TextInput
  - Button
  - FieldError
  - BackButton
  - Text
- Future Figma mapping:
  - Booking summary panel
  - Form group styles and validation visuals
  - Sticky CTA variant if required

## Success
- File: `src/pages/Success.tsx`
- Purpose: Display booking and payment details after successful payment.
- Business logic: Reads `location.state` only.
- Reusable components used:
  - StatusLayout
  - PageHeader
  - InfoCard
  - Text
  - Footer
- Future Figma mapping:
  - Status hero/illustration
  - Summary card
  - Footer action block
