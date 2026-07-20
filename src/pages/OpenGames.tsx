import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Text from '../components/ui/Text'
import { maskMobile, usePersona } from '../context/PersonaContext'
import AppLayout from '../layouts/AppLayout'
import './FigmaSecondary.css'

type PricingType = 'equal_split' | 'custom_price'
type GameStatus = 'draft' | 'open' | 'full' | 'closed' | 'cancelled'

type PaymentPreference = {
  pricingType: PricingType
  paymentMethod: 'upi'
  upiId: string
  instructions?: string
}

type OpenGameParticipant = {
  id: string
  name: string
  mobile: string
}

type JoinRequest = {
  id: string
  userId: string
  playerName: string
  mobile: string
  status: 'payment_pending_confirmation' | 'waiting_for_host_approval' | 'confirmed' | 'rejected'
}

type OpenGame = {
  id: string
  hostUserId: string
  venue: string
  sport: string
  date: string
  time: string
  host: string
  maxPlayers: number
  pricePerPlayer: number
  description: string
  location: string
  status: GameStatus
  isJoiningPaused: boolean
  participants: OpenGameParticipant[]
  pendingRequests: JoinRequest[]
  paymentPreference: PaymentPreference
}

const openGamesSeed: OpenGame[] = [
  {
    id: 'OG-1001',
    hostUserId: 'user_001',
    venue: 'Elite Football Ground',
    sport: 'Football',
    date: '2026-07-24',
    time: '19:00 - 21:00',
    host: 'Vinay',
    maxPlayers: 12,
    pricePerPlayer: 180,
    description: 'Friendly 6v6 game. Balanced teams and rotating substitutions.',
    location: 'Whitefield, Bangalore',
    status: 'open',
    isJoiningPaused: false,
    participants: [
      { id: 'p_01', name: 'Arjun M', mobile: '9991112233' },
      { id: 'p_02', name: 'Karan T', mobile: '9981112234' },
      { id: 'p_03', name: 'Deepak L', mobile: '9971112235' },
      { id: 'p_04', name: 'Neha B', mobile: '9961112236' },
    ],
    pendingRequests: [],
    paymentPreference: {
      pricingType: 'equal_split',
      paymentMethod: 'upi',
      upiId: 'vinay@oksbi',
      instructions: 'Please pay before requesting to join.',
    },
  },
  {
    id: 'OG-1002',
    hostUserId: 'user_003',
    venue: 'BlueShuttle Badminton',
    sport: 'Badminton',
    date: '2026-07-25',
    time: '20:00 - 22:00',
    host: 'Priya S',
    maxPlayers: 6,
    pricePerPlayer: 220,
    description: 'Doubles ladder format. All levels welcome.',
    location: 'Indiranagar, Bangalore',
    status: 'open',
    isJoiningPaused: false,
    participants: [
      { id: 'p_05', name: 'Priya S', mobile: '9942223311' },
      { id: 'p_06', name: 'Mihir V', mobile: '9932223312' },
    ],
    pendingRequests: [],
    paymentPreference: {
      pricingType: 'custom_price',
      paymentMethod: 'upi',
      upiId: 'priya@okaxis',
      instructions: 'Share screenshot after payment.',
    },
  },
  {
    id: 'OG-1003',
    hostUserId: 'user_004',
    venue: 'SkyLine Tennis Club',
    sport: 'Tennis',
    date: '2026-07-26',
    time: '06:00 - 08:00',
    host: 'Rahul N',
    maxPlayers: 4,
    pricePerPlayer: 300,
    description: 'Morning rally + match sets. Bring your own racquet.',
    location: 'Koramangala, Bangalore',
    status: 'open',
    isJoiningPaused: false,
    participants: [
      { id: 'p_07', name: 'Rahul N', mobile: '9922223313' },
    ],
    pendingRequests: [],
    paymentPreference: {
      pricingType: 'equal_split',
      paymentMethod: 'upi',
      upiId: 'rahul@okhdfcbank',
      instructions: 'UPI only. Confirm before start time.',
    },
  },
]

const OPEN_GAMES_STORAGE_KEY = 'goarena-open-games-state-v1'

function getInitialOpenGamesState(): OpenGame[] {
  if (typeof window === 'undefined') {
    return openGamesSeed
  }

  const stored = window.localStorage.getItem(OPEN_GAMES_STORAGE_KEY)
  if (!stored) {
    return openGamesSeed
  }

  try {
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed as OpenGame[] : openGamesSeed
  } catch {
    return openGamesSeed
  }
}

function OpenGames() {
  const { persona, currentUser } = usePersona()
  const [games, setGames] = useState<OpenGame[]>(getInitialOpenGamesState)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(OPEN_GAMES_STORAGE_KEY, JSON.stringify(games))
    }
  }, [games])

  const joinStatusByGame = useMemo(() => {
    const statusMap: Record<string, JoinRequest['status'] | 'none'> = {}

    for (const game of games) {
      const pendingRequest = game.pendingRequests.find((request) => request.userId === currentUser.id)
      const participant = game.participants.find((participantItem) => participantItem.id === currentUser.id)

      if (participant) {
        statusMap[game.id] = 'confirmed'
      } else if (pendingRequest) {
        statusMap[game.id] = pendingRequest.status
      } else {
        statusMap[game.id] = 'none'
      }
    }

    return statusMap
  }, [currentUser.id, games])

  const requestJoin = (gameId: string) => {
    setGames((previous) => previous.map((game) => {
      if (game.id !== gameId) {
        return game
      }

      const alreadyRequested = game.pendingRequests.some((request) => request.userId === currentUser.id)
      const alreadyParticipant = game.participants.some((participant) => participant.id === currentUser.id)
      if (alreadyRequested || alreadyParticipant) {
        return game
      }

      return {
        ...game,
        pendingRequests: [
          ...game.pendingRequests,
          {
            id: `jr_${Date.now()}`,
            userId: currentUser.id,
            playerName: currentUser.name,
            mobile: currentUser.mobile,
            status: 'payment_pending_confirmation',
          },
        ],
      }
    }))
  }

  const updateRequestStatus = (gameId: string, requestId: string, status: 'confirmed' | 'rejected') => {
    setGames((previous) => previous.map((game) => {
      if (game.id !== gameId) {
        return game
      }

      const request = game.pendingRequests.find((item) => item.id === requestId)
      if (!request) {
        return game
      }

      const remainingRequests = game.pendingRequests.filter((item) => item.id !== requestId)

      if (status === 'confirmed') {
        return {
          ...game,
          participants: [
            ...game.participants,
            {
              id: request.userId,
              name: request.playerName,
              mobile: request.mobile,
            },
          ],
          pendingRequests: remainingRequests,
        }
      }

      return {
        ...game,
        pendingRequests: [
          ...remainingRequests,
          {
            ...request,
            status: 'rejected',
          },
        ],
      }
    }))
  }

  const updateHostGame = (gameId: string, updater: (game: OpenGame) => OpenGame) => {
    setGames((previous) => previous.map((game) => (game.id === gameId ? updater(game) : game)))
  }

  const removeParticipant = (gameId: string, participantId: string) => {
    updateHostGame(gameId, (game) => ({
      ...game,
      participants: game.participants.filter((participant) => participant.id !== participantId),
    }))
  }

  const updatePaymentPreference = (gameId: string, key: 'upiId' | 'instructions', value: string) => {
    updateHostGame(gameId, (game) => ({
      ...game,
      paymentPreference: {
        ...game.paymentPreference,
        [key]: value,
      },
    }))
  }

  return (
    <AppLayout fullBleed showHeader={false} showFooter={false}>
      <main className="figma-page">
        <div className="figma-container">
          <section className="figma-hero-strip">
            <div className="figma-row">
              <Text as="h1" unstyled className="figma-page-title">Open Games</Text>
              <div className="figma-actions figma-top-actions">
                <Link to="/search" className="success-link">Search Venues</Link>
                <Link to="/bookings" className="success-link">My Bookings</Link>
                <Link to="/profile" className="success-link">Profile</Link>
                <Link to="/" className="success-link success-link-primary">Back Home</Link>
              </div>
            </div>
            <Text as="p" unstyled className="figma-subtext">
              {persona === 'host'
                ? 'Manage your open games, requests, and participants as host.'
                : 'Discover open games in and around you and request to join instantly.'}
            </Text>
            <div className="figma-tags">
              <span>Developer Persona: {persona === 'host' ? 'Host' : 'Player'}</span>
              <span>Active User: {currentUser.name}</span>
            </div>
          </section>

          <section className="figma-stack">
            {games.map((game) => {
              const isHostGame = persona === 'host' && game.hostUserId === currentUser.id
              const slotsRemaining = Math.max(game.maxPlayers - game.participants.length, 0)
              const gameState: GameStatus = game.status === 'cancelled'
                ? 'cancelled'
                : game.status === 'closed'
                  ? 'closed'
                  : slotsRemaining === 0
                    ? 'full'
                    : game.status

              const playerJoinStatus = joinStatusByGame[game.id]

              return (
                <article key={game.id} className="figma-card booking-history-card">
                  <div className="figma-row booking-mini-row">
                    <Text as="h3" unstyled className="figma-h3">{game.venue}</Text>
                    <span className={`booking-status ${gameState === 'open' ? 'is-upcoming' : 'is-completed'}`}>
                      {gameState.charAt(0).toUpperCase() + gameState.slice(1)}
                    </span>
                  </div>

                  <Text as="p" unstyled className="figma-p"><strong>Sport:</strong> {game.sport}</Text>
                  <Text as="p" unstyled className="figma-p"><strong>Location:</strong> {game.location}</Text>
                  <Text as="p" unstyled className="figma-p"><strong>Date:</strong> {game.date}</Text>
                  <Text as="p" unstyled className="figma-p"><strong>Time:</strong> {game.time}</Text>
                  <Text as="p" unstyled className="figma-p"><strong>Host:</strong> {game.host}</Text>
                  <Text as="p" unstyled className="figma-p"><strong>Players Joined:</strong> {game.participants.length}/{game.maxPlayers}</Text>
                  <div className="open-game-metric-row">
                    <Text as="p" unstyled className="figma-p"><strong>Slots Remaining:</strong> {slotsRemaining}</Text>
                    {isHostGame && (
                      <div className="open-game-stepper" aria-label="Adjust slots">
                        <button
                          type="button"
                          className="open-game-stepper-btn is-minus"
                          aria-label="Reduce slots"
                          onClick={() => updateHostGame(game.id, (item) => ({ ...item, maxPlayers: Math.max(item.participants.length, item.maxPlayers - 1) }))}
                          disabled={game.maxPlayers <= game.participants.length}
                        >
                          −
                        </button>
                        <button
                          type="button"
                          className="open-game-stepper-btn is-plus"
                          aria-label="Increase slots"
                          onClick={() => updateHostGame(game.id, (item) => ({ ...item, maxPlayers: item.maxPlayers + 1 }))}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                  <Text as="p" unstyled className="figma-p"><strong>Pricing Type:</strong> {game.paymentPreference.pricingType === 'equal_split' ? 'Equal Split' : 'Custom Price'}</Text>
                  <div className="open-game-metric-row">
                    <Text as="p" unstyled className="figma-price">₹{game.pricePerPlayer} per player</Text>
                    {isHostGame && (
                      <div className="open-game-stepper" aria-label="Adjust price">
                        <button
                          type="button"
                          className="open-game-stepper-btn is-minus"
                          aria-label="Decrease price"
                          onClick={() => updateHostGame(game.id, (item) => ({ ...item, pricePerPlayer: Math.max(50, item.pricePerPlayer - 20) }))}
                          disabled={game.pricePerPlayer <= 50}
                        >
                          −
                        </button>
                        <button
                          type="button"
                          className="open-game-stepper-btn is-plus"
                          aria-label="Increase price"
                          onClick={() => updateHostGame(game.id, (item) => ({ ...item, pricePerPlayer: item.pricePerPlayer + 20 }))}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                  <Text as="p" unstyled className="figma-p">{game.description}</Text>

                  <div className="figma-tags figma-compact-tags">
                    {isHostGame ? (
                      <label className="open-game-inline-field">
                        <span>UPI ID</span>
                        <input
                          type="text"
                          value={game.paymentPreference.upiId}
                          onChange={(event) => updatePaymentPreference(game.id, 'upiId', event.target.value)}
                          placeholder="example@upi"
                          style={{
                            width: `${Math.max(12, Math.min(36, (game.paymentPreference.upiId || 'example@upi').length + 4))}ch`,
                          }}
                        />
                      </label>
                    ) : (
                      <span>UPI: {game.paymentPreference.upiId}</span>
                    )}
                    {persona === 'player' && game.paymentPreference.instructions && <span>{game.paymentPreference.instructions}</span>}
                  </div>

                  <Text as="h3" unstyled className="figma-h3" style={{ marginTop: 12 }}>Participants</Text>
                  <div className="success-fields">
                    {game.participants.map((participant) => (
                      <div key={participant.id} className="success-field-row">
                        <span className="success-field-label">{participant.name}</span>
                        <span className="success-field-value">
                          {persona === 'host' ? participant.mobile : maskMobile(participant.mobile)}
                        </span>
                        {isHostGame && participant.id !== currentUser.id && (
                          <button
                            type="button"
                            className="open-game-row-action is-danger"
                            onClick={() => removeParticipant(game.id, participant.id)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {isHostGame && (
                    <>
                      <Text as="h3" unstyled className="figma-h3">Pending Join Requests</Text>
                      {game.pendingRequests.filter((request) => request.status !== 'rejected').length === 0 ? (
                        <Text as="p" unstyled className="figma-p">No pending requests.</Text>
                      ) : (
                        <div className="success-fields">
                          {game.pendingRequests
                            .filter((request) => request.status !== 'rejected')
                            .map((request) => (
                              <div key={request.id} className="success-field-row">
                                <div>
                                  <span className="success-field-label">{request.playerName}</span>
                                  <div className="figma-p">{request.mobile}</div>
                                </div>
                                <div className="figma-actions">
                                  <button
                                    type="button"
                                    className="open-game-row-action is-positive"
                                    onClick={() => updateRequestStatus(game.id, request.id, 'confirmed')}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    type="button"
                                    className="open-game-row-action is-danger"
                                    onClick={() => updateRequestStatus(game.id, request.id, 'rejected')}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}

                      <div className="figma-actions" style={{ marginTop: 8 }}>
                        <button type="button" onClick={() => updateHostGame(game.id, (item) => ({ ...item, isJoiningPaused: !item.isJoiningPaused }))}>
                          {game.isJoiningPaused ? 'Resume Joining' : 'Pause Joining'}
                        </button>
                        <button type="button" onClick={() => updateHostGame(game.id, (item) => ({ ...item, status: item.status === 'closed' ? 'open' : 'closed' }))}>
                          {game.status === 'closed' ? 'Open Game' : 'Close Game'}
                        </button>
                        <button type="button" onClick={() => updateHostGame(game.id, (item) => ({ ...item, status: 'cancelled' }))}>Cancel Open Game</button>
                      </div>
                    </>
                  )}

                  {!isHostGame && (
                    <>
                      <Text as="p" unstyled className="figma-p" style={{ marginBottom: 10 }}>
                        <strong>Your Status:</strong>{' '}
                        {playerJoinStatus === 'none' && 'Not Joined'}
                        {playerJoinStatus === 'payment_pending_confirmation' && 'Payment Pending Confirmation'}
                        {playerJoinStatus === 'waiting_for_host_approval' && 'Waiting for Host Approval'}
                        {playerJoinStatus === 'confirmed' && 'Confirmed'}
                        {playerJoinStatus === 'rejected' && 'Rejected'}
                      </Text>
                      <div className="figma-actions">
                        <button
                          type="button"
                          disabled={gameState !== 'open' || game.isJoiningPaused || slotsRemaining === 0 || playerJoinStatus !== 'none'}
                          onClick={() => requestJoin(game.id)}
                        >
                          I Have Paid
                        </button>
                        <Link to="/search" className="success-link">View Venue</Link>
                      </div>
                    </>
                  )}
                </article>
              )
            })}
          </section>
        </div>
      </main>
    </AppLayout>
  )
}

export default OpenGames
