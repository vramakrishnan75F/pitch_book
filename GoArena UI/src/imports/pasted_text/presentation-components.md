I am NOT building a new application.

I already have a production-ready React application called GoArena.

Your responsibility is ONLY to generate the presentation layer.

The existing application already contains all business logic.

--------------------------------------------------
PROJECT STACK
--------------------------------------------------

React 18
TypeScript
Vite
React Router
Tailwind CSS
Express Backend
Razorpay Integration

--------------------------------------------------
CURRENT ARCHITECTURE
--------------------------------------------------

src/

assets/
components/
design/
hooks/
layouts/
pages/
repositories/
services/
types/
utilities/

Business logic already exists inside

hooks/
services/
repositories/

Presentation components already exist inside

components/ui/

Theme system already exists.

Design tokens already exist.

Routing already exists.

Booking flow already exists.

Payment flow already exists.

--------------------------------------------------
VERY IMPORTANT
--------------------------------------------------

Do NOT generate another application.

Do NOT create another architecture.

Your code must fit INTO my project.

--------------------------------------------------
DO NOT CREATE
--------------------------------------------------

App.tsx

main.tsx

Router

BrowserRouter

createBrowserRouter

Route definitions

Providers

ThemeProvider

BookingContext

PaymentContext

Redux

Zustand

React Query

Mock backend

Express server

API server

Authentication

Business logic

Validation logic

Payment logic

Booking logic

Navigation logic

--------------------------------------------------
GENERATE ONLY
--------------------------------------------------

Presentational React Components

Tailwind styling

Responsive layouts

Animations

Illustrations

Icons

Cards

Lists

Sections

Dialogs

Bottom Sheets

Status Pages

Empty States

Loading Skeletons

Typography

Spacing

--------------------------------------------------
DATA
--------------------------------------------------

Do NOT use static data.

Do NOT create data.ts.

Do NOT hardcode venues.

Do NOT hardcode bookings.

Do NOT hardcode sports.

Everything should come through typed props.

Every component must be reusable.

--------------------------------------------------
API CALLS
--------------------------------------------------

Never fetch data.

Never call APIs.

Never import axios.

Never import fetch.

Never use useEffect to load data.

The parent page will provide all required data.

--------------------------------------------------
STATE
--------------------------------------------------

Never create state that belongs to the application.

Use props instead.

Local UI state is acceptable only for:

Accordion

Tabs

Dropdown

Animation

Modal visibility

Hover effects

--------------------------------------------------
NAVIGATION
--------------------------------------------------

Never navigate.

Do not use

useNavigate()

<Link>

router.push()

Instead expose callbacks.

Example

onVenueClick()

onBook()

onContinue()

onRetry()

onCancel()

The parent page will implement navigation.

--------------------------------------------------
PAYMENT
--------------------------------------------------

Never integrate Razorpay.

Never open checkout.

Never call payment APIs.

Simply expose

onPayNow()

--------------------------------------------------
FORMS
--------------------------------------------------

Do not submit forms.

Expose callbacks.

onSearch()

onFilter()

onApplyCoupon()

onConfirmBooking()

--------------------------------------------------
ICONS
--------------------------------------------------

Assume an existing Icon component.

Do not import icon libraries directly into every component.

--------------------------------------------------
BUTTONS
--------------------------------------------------

Assume reusable Button component already exists.

Reuse existing UI primitives whenever possible.

--------------------------------------------------
DESIGN TOKENS
--------------------------------------------------

Do not hardcode colors.

Do not hardcode typography.

Do not hardcode spacing.

Use semantic class names and CSS variables compatible with an existing design system.

--------------------------------------------------
OUTPUT FORMAT
--------------------------------------------------

Generate only reusable components.

For every component include

Component Name

Purpose

Props

Events (callbacks)

Required Assets

Responsive Behavior

Dependencies

Do not generate complete application scaffolding.

--------------------------------------------------
SCREENS
--------------------------------------------------

Generate presentation components for:

Landing

Search

Venue Details

Slot Selection

Booking Summary

Payment

Booking Success

My Bookings

Profile

Payment Failed

Payment Cancelled

Booking Expired

No Search Results

No Slots Available

Offline

Loading

Empty Bookings

--------------------------------------------------
FINAL DOCUMENT
--------------------------------------------------

Generate a markdown file named

figma-integration.md

Include

Component hierarchy

Required props

Callback interfaces

Assets required

Existing components to reuse

Any manual integration steps

The output should be plug-and-play into an existing GoArena application without replacing business logic, routing, APIs, state management, or payment flow.