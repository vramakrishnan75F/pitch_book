# GoArena Figma Import Plan

## 1) Project comparison

### Current GoArena application (Project A)

- backend/
- docs/
- public/
- src/
- src/assets/
- src/components/
- src/components/ui/
- src/design/
- src/hooks/
- src/layouts/
- src/pages/
- src/repositories/
- src/services/
- src/theme/
- src/types/
- src/utilities/

### Downloaded Figma project (Project B)

- ATTRIBUTIONS.md
- default_shadcn_theme.css
- figma-integration.md
- guidelines/
- index.html
- package.json
- pnpm-workspace.yaml
- postcss.config.mjs
- README.md
- src/
- src/app/
- src/app/components/
- src/app/components/figma/
- src/app/components/ui/
- src/components/
- src/components/goarena/
- src/components/goarena/booking/
- src/components/goarena/bookings/
- src/components/goarena/landing/
- src/components/goarena/payment/
- src/components/goarena/profile/
- src/components/goarena/search/
- src/components/goarena/skeletons/
- src/components/goarena/status/
- src/components/goarena/venue/
- src/imports/
- src/imports/pasted_text/
- src/pages/
- src/styles/
- vite.config.ts

## 2) Recommended initial staging location

Recommended path:

- GoArena root
- __figma_import__/

Full local path:

- C:/Users/Vinay Ramakrishnan/Downloads/Pitch book/__figma_import__/

Reason:

- Keeps the complete downloaded package intact and reviewable.
- Prevents accidental overwrite of current runtime files.
- Enables controlled copy/merge decisions per folder.
- Makes rollback trivial by deleting one staging directory.

## 3) Folder action matrix (Figma source to action)

### Figma project top-level

- guidelines/ -> COPY to docs/figma-source/guidelines/ (reference only)
- src/ -> COPY into __figma_import__/src first (staging only)
- ATTRIBUTIONS.md -> COPY to docs/figma-source/ATTRIBUTIONS.md
- figma-integration.md -> COPY to docs/figma-source/figma-integration.md
- README.md -> COPY to docs/figma-source/README.md
- default_shadcn_theme.css -> IGNORE at root import step
- index.html -> IGNORE
- package.json -> IGNORE
- pnpm-workspace.yaml -> IGNORE
- postcss.config.mjs -> IGNORE
- vite.config.ts -> IGNORE

### Figma src-level

- src/app/ -> REFERENCE ONLY
- src/components/ -> MERGE selectively
- src/imports/ -> IGNORE
- src/pages/ -> REFERENCE ONLY
- src/styles/ -> MERGE selectively into token/theme pipeline
- src/main.tsx -> IGNORE

### Figma src/app

- src/app/App.tsx -> IGNORE
- src/app/Layout.tsx -> REFERENCE ONLY
- src/app/BookingLayout.tsx -> REFERENCE ONLY
- src/app/routes.tsx -> IGNORE
- src/app/BookingContext.tsx -> IGNORE
- src/app/data.ts -> REFERENCE ONLY
- src/app/components/figma/ -> MERGE CANDIDATE (utility-only)
- src/app/components/ui/ -> MERGE CANDIDATE (compare one by one)

### Figma src/components

- src/components/goarena/ -> COPY first into src/components/figma-goarena/ then MERGE by component
- src/components/goarena/landing/ -> COPY
- src/components/goarena/search/ -> COPY
- src/components/goarena/venue/ -> COPY
- src/components/goarena/booking/ -> COPY
- src/components/goarena/payment/ -> COPY
- src/components/goarena/status/ -> COPY
- src/components/goarena/bookings/ -> COPY
- src/components/goarena/profile/ -> COPY
- src/components/goarena/skeletons/ -> COPY
- src/components/goarena/types.ts -> MERGE into src/types with controlled mapping

### Figma src/imports

- src/imports/pasted_text/ -> IGNORE

### Figma src/pages

- src/pages/*.tsx -> REFERENCE ONLY

### Figma src/styles

- src/styles/fonts.css -> MERGE selectively (font-face only)
- src/styles/globals.css -> REFERENCE ONLY
- src/styles/index.css -> REFERENCE ONLY
- src/styles/tailwind.css -> IGNORE unless Tailwind adoption is approved
- src/styles/theme.css -> MERGE selectively into src/theme and src/design

## 4) Exact destination table

| Figma source | Destination in GoArena | Action | Reason |
|---|---|---|---|
| entire downloaded folder | __figma_import__/GoArena UI | COPY | Safe staging with zero overwrite risk |
| src/components/goarena | src/components/figma-goarena | COPY | Preserve full presentation set for controlled integration |
| src/components/goarena/landing | src/components/figma-goarena/landing | COPY | Screen presentation components |
| src/components/goarena/search | src/components/figma-goarena/search | COPY | Screen presentation components |
| src/components/goarena/venue | src/components/figma-goarena/venue | COPY | Screen presentation components |
| src/components/goarena/booking | src/components/figma-goarena/booking | COPY | Booking presentation pieces |
| src/components/goarena/payment | src/components/figma-goarena/payment | COPY | Payment presentation pieces |
| src/components/goarena/status | src/components/figma-goarena/status | COPY | Status screen visuals |
| src/components/goarena/skeletons | src/components/figma-goarena/skeletons | COPY | Skeleton visuals |
| src/components/goarena/bookings | src/components/figma-goarena/bookings | COPY | Booking list presentation |
| src/components/goarena/profile | src/components/figma-goarena/profile | COPY | Profile presentation |
| src/components/goarena/types.ts | src/types/figma-goarena.ts | COPY then MERGE | Type reconciliation without breaking current types |
| src/app/components/ui | src/components/ui-figma-candidate | COPY then MERGE selectively | Avoid replacing current stable primitives blindly |
| src/app/components/figma | src/components/figma-support | COPY | Utility wrappers only |
| src/styles/theme.css | src/theme/figma-theme-reference.css | COPY then MERGE | Token extraction source |
| src/styles/fonts.css | src/assets/fonts + theme integration | MERGE selectively | Font assets may be needed |
| src/styles/globals.css | docs/figma-source/styles-reference | REFERENCE ONLY | Prevent style collisions |
| src/pages | docs/figma-source/pages-reference | REFERENCE ONLY | Keep existing routing and flow |
| guidelines | docs/figma-source/guidelines | COPY | Design intent documentation |
| figma-integration.md | docs/figma-source/figma-integration.md | COPY | Implementation guidance |

## 5) Files that must never be copied into runtime (direct replace forbidden)

- src/main.tsx (Figma project)
- src/app/routes.tsx
- src/app/App.tsx
- src/app/Layout.tsx
- src/app/BookingLayout.tsx
- src/app/BookingContext.tsx
- src/app/data.ts (if it includes mock/domain routing assumptions)
- src/pages/* (as direct overwrite)
- package.json
- pnpm-workspace.yaml
- vite.config.ts (Figma project)
- postcss.config.mjs
- default_shadcn_theme.css (direct root overwrite)
- index.html (Figma project)
- tailwind.css (unless Tailwind is explicitly adopted)
- any mock APIs or fake service files if present in imported package

## 6) Duplicate component decisions

| Component area | Current GoArena | Figma project | Recommendation |
|---|---|---|---|
| Button | src/components/ui/Button.tsx | src/app/components/ui/button.tsx | MERGE |
| Card | src/components/ui/InfoCard.tsx | src/app/components/ui/card.tsx | MERGE |
| Input | src/components/ui/TextInput.tsx | src/app/components/ui/input.tsx | MERGE |
| Dialog | src/components/ui/AlertDialog.tsx etc. | src/app/components/ui/dialog.tsx, alert-dialog.tsx | MERGE |
| Modal | src/components/ui/Modal.tsx | drawer/sheet/dialog family | MERGE |
| Container | src/components/ui/Container.tsx | layout wrappers in Figma app | KEEP current layout core, import style details |
| Typography | src/components/ui/Text.tsx | style classes in Figma | KEEP current API, map Figma tokens |
| Header | src/components/ui/Header.tsx | page-specific Figma headers | MERGE |
| Footer | src/components/ui/Footer.tsx | page-specific Figma footers | MERGE |
| Navigation | src/components/ui/NavigationBar.tsx | navigation-menu and page nav blocks | MERGE |
| Status | src/components/ui/StatusPage.tsx | status screens/components | MERGE |
| Skeleton | src/components/ui/Skeleton*.tsx | skeletons/Skeletons.tsx and ui/skeleton.tsx | MERGE |

Rule for all duplicates:

- Keep current component contracts where already used by business-flow pages.
- Bring Figma visuals in by adapting internals or adding variants.
- Avoid replacing live component APIs in one step.

## 7) Manual integration steps (after approval)

1. Create staging folder: __figma_import__/ and paste entire downloaded package there.
2. Copy Figma presentation components into src/components/figma-goarena.
3. Copy Figma guidelines/docs into docs/figma-source.
4. Build component mapping matrix: figma component -> existing component or new variant.
5. Merge styles into token/theme system, not page-level globals.
6. Integrate one screen at a time by replacing presentation only.
7. Keep hooks/services/repositories/pages logic untouched.
8. Run build after each screen migration.
9. Run booking + payment regression checks after each merge batch.

## 8) Estimated integration order

1. Theme and typography parity
2. Core primitives (Button, Input, Card, Text)
3. Navigation shell (Header/Footer/AppLayout)
4. Home screen presentation swap
5. Booking screen presentation swap
6. Success/status presentation swap
7. Secondary presentation sets (search/venue/profile/bookings)
8. Skeleton and dialog polish
9. Accessibility and responsive verification

## 9) Risks

- CSS collisions if global Figma styles are imported directly.
- Runtime behavior regressions if Figma app-level files are copied over current routing context.
- Type mismatches between Figma component props and current booking domain types.
- Dependency bloat if Figma package dependencies are merged wholesale.

## 10) Rollback strategy

- Keep all imported assets/components isolated under staging and figma-specific namespaces first.
- Merge only small, reviewable batches.
- Commit before each migration phase.
- If any regression appears, revert the last merge commit only.
- Do not remove original components until screen parity is verified.
