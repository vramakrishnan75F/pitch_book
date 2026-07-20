# Sprint 4 - Open Games Foundation

## Scope
Frontend-only Open Games foundation with development persona switching.

Constraints honored:
- No backend implementation
- No database implementation
- No authentication implementation
- No payment gateway integration for Open Games
- Existing booking/payment flows unchanged

## 1. Product Architecture
Open Games is implemented as a standalone frontend module connected to existing app navigation and My Bookings.

Core flow:
- Host opens game from My Bookings
- Host configures/manages Open Game
- Players discover and join from Open Games page
- Host approves/rejects requests manually after off-platform payment confirmation

Architecture layers:
- Context: PersonaContext (temporary auth substitute)
- Page: OpenGames
- Existing integration: Home, MyBookings, App routing
- Domain models: defined as TypeScript types in page-level mock module for now

## 2. Navigation Changes
Added navigation entry point to Open Games:
- Home top navigation includes Open Games
- Home Featured/Open tab routes to Open Games page
- Home Open Games CTA routes to /open-games
- New route: /open-games

## 3. Screen Designs (Implemented)
- Home: Developer Demo Mode panel (Host/Player switch)
- Open Games listing cards with game metadata
- Persona-aware card controls:
  - Host controls (for owned games)
  - Player join/payment-intent controls
- My Bookings host action: Open this Game

## 4. Component Hierarchy
- PersonaProvider
  - ThemeProvider
    - BrowserRouter
      - App
        - Home
          - Developer Persona Panel
        - MyBookings
          - Host action: Open this Game
        - OpenGames
          - OpenGameCard[]
            - ParticipantList
            - HostControls (host-owned games)
            - JoinSection (player)
            - PendingJoinRequests (host-owned games)

## 5. Proposed Database Schema (Proposal only)

### OpenGame
- id (string, pk)
- host_user_id (string, fk user)
- booking_id (string, fk booking)
- venue_name (string)
- sport (string)
- game_title (string)
- description (text)
- date (date)
- start_time (time)
- end_time (time)
- max_players (int)
- status (enum: draft, open, full, closed, cancelled)
- is_joining_paused (boolean)
- price_per_player (decimal)
- pricing_type (enum: equal_split, custom_price)
- created_at (timestamp)
- updated_at (timestamp)

### PaymentPreference
- id (string, pk)
- open_game_id (string, fk open_game)
- payment_method (enum: upi)
- upi_id (string)
- instructions (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)

### OpenGameParticipant
- id (string, pk)
- open_game_id (string, fk open_game)
- user_id (string, fk user)
- display_name (string)
- mobile_number (string)
- participant_status (enum: confirmed, removed)
- joined_at (timestamp)

### JoinRequest
- id (string, pk)
- open_game_id (string, fk open_game)
- user_id (string, fk user)
- player_name (string)
- mobile_number (string)
- request_status (enum: payment_pending_confirmation, waiting_for_host_approval, confirmed, rejected)
- created_at (timestamp)
- updated_at (timestamp)

## 6. API Contract Proposal (No backend implementation)

### Open Games
- GET /api/open-games
  - Query: sport, location, date, status
  - Response: OpenGame[] with summary
- GET /api/open-games/:id
  - Response: OpenGame detail + participants + payment preference
- POST /api/open-games
  - Host creates from booking
- PATCH /api/open-games/:id
  - Host edits title/description/price/max players/status/pause
- POST /api/open-games/:id/close
- POST /api/open-games/:id/cancel
- POST /api/open-games/:id/pause
- POST /api/open-games/:id/resume

### Join Requests
- POST /api/open-games/:id/join-requests
  - Creates request with status payment_pending_confirmation
- GET /api/open-games/:id/join-requests
  - Host-only
- POST /api/open-games/:id/join-requests/:requestId/accept
- POST /api/open-games/:id/join-requests/:requestId/reject

### Participants
- DELETE /api/open-games/:id/participants/:participantId
  - Host removes participant

## 7. State Management Plan
Current sprint uses in-memory page state + PersonaContext.

Recommended upgrade path:
- Keep PersonaContext contract stable, replace implementation with AuthContext later
- Move OpenGames state to a feature store (React Query or Zustand)
- Introduce API repository layer for open games, requests, participants
- Add optimistic updates for host actions and request transitions

## 8. Folder Structure (Current + Proposed)

Current additions:
- src/context/PersonaContext.tsx
- src/pages/OpenGames.tsx

Future structure:
- src/features/open-games/
  - components/
  - hooks/
  - models/
  - services/
  - repository/
  - pages/

## 9. Mock Data
Mock users:
- Host: Vinay, 9876543210, user_001, vinay@oksbi
- Player: Rahul, 9987654321, user_002

Mock game entities include:
- Open games
- Payment preferences
- Participants
- Pending join requests

## 10. Authentication Integration Plan
PersonaContext is intentionally designed as a drop-in temporary provider.

Migration approach:
- Preserve usePersona() consumer shape in pages
- Replace PersonaProvider internals with real AuthProvider session data
- Map auth user role/permissions to existing persona-driven UI toggles
- Keep page components mostly unchanged; only context implementation changes

## Implementation Notes
- Host controls are visible only for host-owned games
- Host can approve/reject requests, change price, adjust slots, pause/resume/close/cancel, remove participants
- Player can discover games, see host payment preference, and use I Have Paid to create join request state
- Mobile number visibility is masked for player persona and full for host persona
