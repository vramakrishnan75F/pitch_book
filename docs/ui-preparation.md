# UI Preparation Report: GoArena

## Current UI Architecture (Before Cleanup)

- UI and business logic were mixed inside page files:
  - `src/pages/Home.tsx`
  - `src/pages/Booking.tsx`
  - `src/pages/Success.tsx`
- Payment orchestration, SDK loading, validation, and state mutation were embedded directly in page JSX containers.
- Page-level inline styles were extensively used for spacing, colors, radius, and layout.
- Product naming remained mixed (`PitchFlow`, `Pitch`, `Pitch Book` context).

## Problems Found

- Heavy inline styles in pages:
  - hardcoded color values
  - hardcoded spacing values
  - hardcoded border radius values
  - hardcoded typography/weights
- Presentation duplication:
  - repeated page container styles
  - repeated button styles
  - repeated input styles
  - repeated field-error rendering patterns
- Logic duplication and coupling:
  - payment flow implementation and form state coupled to `Booking` render container
  - slot selection and booking state creation coupled to `Home` render container
- Design primitives were not centralized in a token system.
- Asset folders were not organized for future design handoff.

## Components Extracted

Created reusable presentational UI components under `src/components/ui`:

- `Button.tsx`
- `Container.tsx`
- `FieldError.tsx`
- `InfoCard.tsx`
- `PageHeader.tsx`
- `TextInput.tsx`

These components accept props and contain no business logic.

## Design Tokens Introduced

Created `src/design` foundation:

- `colors.ts`
- `typography.ts`
- `spacing.ts`
- `radius.ts`
- `shadows.ts`
- `breakpoints.ts`
- `animation.ts`
- `icons.ts`
- `zindex.ts`

Token categories include placeholders for:

- Colors and semantic surfaces/text
- Typography scales
- Spacing scale
- Elevation/shadows
- Radius
- Motion/easing/duration
- Icon naming map
- z-index layers
- Breakpoint and container sizing
- Dark mode placeholder namespace

## Files Reorganized

### Logic Extraction

- `src/hooks/useHomeBooking.ts`
- `src/hooks/useBookingPayment.ts`
- `src/services/paymentService.ts`
- `src/services/razorpayService.ts`
- `src/repositories/paymentRepository.ts`
- `src/utilities/validation.ts`
- `src/types/booking.ts`

### Pages Refactored to Presentation Containers

- `src/pages/Home.tsx`
- `src/pages/Booking.tsx`
- `src/pages/Success.tsx`

### Asset Structure Prepared

Created:

- `src/assets/logos/`
- `src/assets/illustrations/`
- `src/assets/icons/`
- `src/assets/images/`
- `src/assets/sports/`
- `src/assets/placeholders/`

(with `.gitkeep` placeholders)

## Business Logic/Flow Safety

- Routing behavior preserved.
- Booking flow preserved.
- API route usage preserved (`/api/payment/create-order`).
- Backend calls preserved.
- Payment success/cancel/error user flow preserved.

## Remaining Technical Debt

- Existing root-level visual baseline in `src/index.css` is intentionally minimal but still not connected to TypeScript token source automatically.
- UI primitives are intentionally lightweight and should be expanded after Figma import defines exact component states/variants.
- Some domain wording in data model (`pitchName`) is retained for compatibility with current flow and should be renamed only if backend/flow contracts are updated.
- No dedicated theme provider/context yet (deferred until Figma token pipeline is finalized).

## Recommendations Before Importing Figma

1. Finalize semantic naming matrix (GoArena labels vs domain field names).
2. Lock a single token source-of-truth strategy (TypeScript tokens + CSS variable export mapping).
3. Define component variant matrix from Figma (size/state/intent/interaction).
4. Add visual regression checks after replacing presentation components.
5. Introduce Storybook (or equivalent) for design component validation once Figma specs arrive.
6. Add accessibility pass for all component states during the import sprint.
