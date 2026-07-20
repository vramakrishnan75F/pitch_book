# Component Inventory

## Layout

### AppLayout
- Purpose: Main app shell with header, content, footer.
- Props: title, children.
- Variants: none.
- States: default.
- Example: Home page shell.

### BookingLayout
- Purpose: Booking-specific wrapper built on AppLayout.
- Props: children.
- Variants: none.
- States: default.
- Example: Booking screen shell.

### MinimalLayout
- Purpose: Minimal shell for lightweight screens.
- Props: children.
- Variants: none.
- States: default.
- Example: utility and placeholder pages.

### StatusLayout
- Purpose: Status-oriented shell built on MinimalLayout.
- Props: children.
- Variants: none.
- States: default.
- Example: Success/status screens.

## Navigation

### Header
- Purpose: Top navigation/title bar.
- Props: title, actions.
- Variants: none.
- States: default.

### NavigationBar
- Purpose: Horizontal/stacking nav links area.
- Props: children.
- Variants: none.
- States: default.

### Footer
- Purpose: Footer slot with spacing and border.
- Props: children.
- Variants: none.
- States: default.

### BottomNavigation
- Purpose: Sticky bottom navigation region.
- Props: children.
- Variants: none.
- States: default.

### BackButton
- Purpose: Unified back action button.
- Props: onClick, label.
- Variants: none.
- States: default.

### Breadcrumb
- Purpose: Hierarchy path text.
- Props: items.
- Variants: none.
- States: default.

### SectionHeader
- Purpose: Section title + optional action.
- Props: title, action.
- Variants: none.
- States: default.

### StickyActionBar
- Purpose: Sticky action area at bottom.
- Props: children.
- Variants: none.
- States: default.

## Typography

### Text
- Purpose: Unified text rendering with semantic variants.
- Props: as, variant, weight, align, color, truncate, lineClamp, style, children.
- Variants: display, headline, title, subtitle, body, bodySmall, label, caption, button.
- States: default, truncated, clamped.

## Icons

### Icon
- Purpose: Abstract icon layer for future pack replacement.
- Props: name, size, color, variant.
- Variants: outline, filled.
- States: default.

## Buttons / Inputs / Forms

### Button
- Purpose: Reusable action button and slot-button variant.
- Props: children, onClick, type, disabled, selected, variant.
- Variants: primary, slot.
- States: default, disabled, selected.

### TextInput
- Purpose: Reusable input control.
- Props: id, name, value, onChange, onBlur, inputMode, maxLength.
- Variants: none.
- States: default.

### Form
- Purpose: Form wrapper.
- Props: native form props + children.
- Variants: none.
- States: default.

### FormField
- Purpose: Form field spacing wrapper.
- Props: children.
- Variants: none.
- States: default.

### Label
- Purpose: Field label with consistent typography.
- Props: native label props.
- Variants: none.
- States: default.

### HelperText
- Purpose: Non-error guidance text.
- Props: message.
- Variants: none.
- States: default.

### ValidationMessage
- Purpose: Validation error display alias.
- Props: message.
- Variants: none.
- States: default.

### FormSection
- Purpose: Group form elements by section.
- Props: children.
- Variants: none.
- States: default.

### FieldGroup
- Purpose: Group related fields with consistent gap.
- Props: children.
- Variants: none.
- States: default.

## Cards / Status / Feedback

### InfoCard
- Purpose: Standard content card.
- Props: children.
- Variants: none.
- States: default.

### FieldError
- Purpose: Error text rendering.
- Props: message.
- Variants: none.
- States: default.

### StatusIllustration
- Purpose: Variant icon for status states.
- Props: variant.
- Variants: success, error, warning, info, empty, offline, maintenance.
- States: default.

### StatusCard
- Purpose: Reusable status message card.
- Props: variant, title, message, illustration, actions.
- Variants: success, error, warning, info, empty, offline, maintenance.
- States: default.

### StatusPage
- Purpose: Full-page status wrapper.
- Props: variant, title, message, actions.
- Variants: success, error, warning, info, empty, offline, maintenance.
- States: default.

## Loading / Skeleton

### Skeleton
- Purpose: Base skeleton block.
- Props: width, height, borderRadius.
- Variants: none.
- States: default.

### SkeletonText
- Purpose: Multi-line text skeleton.
- Props: lines.
- Variants: none.
- States: default.

### SkeletonButton
- Purpose: Button placeholder.
- Props: none.
- Variants: none.
- States: default.

### SkeletonCard
- Purpose: Card placeholder.
- Props: none.
- Variants: none.
- States: default.

### SkeletonVenueCard
- Purpose: Venue card placeholder.
- Props: none.
- Variants: none.
- States: default.

### SkeletonBookingSummary
- Purpose: Booking summary placeholder.
- Props: none.
- Variants: none.
- States: default.

### SkeletonVenueDetails
- Purpose: Venue details placeholder.
- Props: none.
- Variants: none.
- States: default.

### SkeletonHero
- Purpose: Hero section placeholder.
- Props: none.
- Variants: none.
- States: default.

## Dialogs / Modal Framework

### Modal
- Purpose: Generic modal container.
- Props: isOpen, title, message, icon, actions, close.
- Variants: none.
- States: open/closed.

### BottomSheet
- Purpose: Bottom-sheet compatible wrapper.
- Props: isOpen, title, message, icon, actions, close.
- Variants: none.
- States: open/closed.

### ConfirmationDialog
- Purpose: Confirmation interaction dialog.
- Props: isOpen, title, message, actions, close.
- Variants: none.
- States: open/closed.

### AlertDialog
- Purpose: Generic alert dialog.
- Props: isOpen, title, message, actions, close.
- Variants: none.
- States: open/closed.

### SuccessDialog
- Purpose: Success-oriented alert dialog.
- Props: isOpen, title, message, actions, close.
- Variants: success.
- States: open/closed.

### ErrorDialog
- Purpose: Error-oriented alert dialog.
- Props: isOpen, title, message, actions, close.
- Variants: error.
- States: open/closed.
