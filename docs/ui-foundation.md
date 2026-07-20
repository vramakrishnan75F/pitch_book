# GoArena UI Foundation (Sprint 1.1)

## Architecture

The frontend is now split into:

- Presentation containers (pages)
- Layout system (`src/layouts`)
- Theme system (`src/theme`)
- Design token source (`src/design`)
- Reusable UI library (`src/components/ui`)
- Logic hooks (`src/hooks`)
- Services and repositories (`src/services`, `src/repositories`)
- Shared types/utilities (`src/types`, `src/utilities`)

Business logic, APIs, routes, and flow behavior are preserved.

## Component Library

A reusable UI framework now exists for:

- Layout
- Navigation
- Typography
- Icons
- Buttons/Inputs/Forms
- Status/Feedback
- Skeleton placeholders
- Dialogs/Modals

See `docs/component-inventory.md` for full inventory.

## Layouts

Implemented layouts:

- AppLayout
- BookingLayout
- MinimalLayout
- StatusLayout

Layout responsibilities centralized:

- Header/footer placement
- Max width
- Safe spacing
- Background surface
- Scroll-safe wrapper

## Theme

Theme layer implemented:

- ThemeProvider
- ThemeContext
- Theme.ts

Exposes:

- colors
- typography
- spacing
- radius
- shadows
- breakpoints
- animations

Supports:

- light theme (active)
- dark theme placeholder
- event theme placeholder

## Typography

Implemented `Text` component with variants:

- display
- headline
- title
- subtitle
- body
- bodySmall
- label
- caption
- button

Supports:

- weight
- alignment
- color
- truncate
- lineClamp

## Icons

Implemented `Icon` abstraction with semantic names for future icon-pack replacement.

## Navigation

Reusable navigation primitives added:

- Header
- NavigationBar
- Footer
- BottomNavigation
- BackButton
- Breadcrumb
- SectionHeader
- StickyActionBar

## Status System

Added configurable status primitives:

- StatusPage
- StatusCard
- StatusIllustration

Prepared variants:

- success
- error
- warning
- info
- empty
- offline
- maintenance

## Skeletons

Added placeholder skeleton library:

- Skeleton
- SkeletonText
- SkeletonButton
- SkeletonCard
- SkeletonVenueCard
- SkeletonBookingSummary
- SkeletonVenueDetails
- SkeletonHero

## Forms

Reusable form composition components added:

- Form
- FormField
- Label
- HelperText
- ValidationMessage
- FormSection
- FieldGroup

## Dialogs

Added modal/dialog framework:

- Modal
- BottomSheet
- ConfirmationDialog
- AlertDialog
- SuccessDialog
- ErrorDialog

## Inventories

- Component inventory: `docs/component-inventory.md`
- Screen inventory: `docs/screen-inventory.md`
- Figma mapping placeholder: `docs/figma-mapping.md`

## Figma Readiness

The codebase is now structured so Figma integration can focus on replacing presentation components and assets while preserving logic and flow.

## Remaining Technical Debt

- Some component styles still use inline style objects (now centralized in reusable components rather than pages).
- Icon implementation is placeholder-based pending final Figma icon pack.
- Dialog and status systems are scaffolded and not yet deeply integrated into screens.
- Theme switching runtime (light/dark/event toggle) is not wired into UX controls yet.
