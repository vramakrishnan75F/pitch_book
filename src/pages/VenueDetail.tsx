import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/ui/Button'
import Text from '../components/ui/Text'
import AppLayout from '../layouts/AppLayout'
import type { BaseBookingData } from '../types/booking'
import { figmaVenues } from './figmaData'
import './FigmaSecondary.css'

const HOURS = Array.from({ length: 24 }, (_, index) => index)
const UNAVAILABLE_HOURS = [9, 10, 14, 18]

function formatHour(hour: number): string {
  return `${String(hour).padStart(2, '0')}:00`
}

function formatSelectedRanges(hours: number[]): string {
  if (hours.length === 0) {
    return ''
  }

  const sorted = [...hours].sort((left, right) => left - right)
  const ranges: Array<{ start: number; end: number }> = []

  let start = sorted[0]
  let end = sorted[0]

  for (let index = 1; index < sorted.length; index += 1) {
    const current = sorted[index]

    if (current === end + 1) {
      end = current
      continue
    }

    ranges.push({ start, end })
    start = current
    end = current
  }

  ranges.push({ start, end })

  return ranges
    .map((range) => `${formatHour(range.start)} - ${formatHour((range.end + 1) % 24)}`)
    .join(', ')
}

function VenueDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const venueId = Number(params.id)
  const venue = figmaVenues.find((item) => item.id === venueId)
  const shouldOpenTimeline = (location.state as { openBookingTimeline?: boolean } | null)?.openBookingTimeline === true
  const [showTimeline, setShowTimeline] = useState(shouldOpenTimeline)
  const [selectedHours, setSelectedHours] = useState<number[]>([])

  if (!venue) {
    return (
      <AppLayout fullBleed showHeader={false} showFooter={false}>
        <main className="figma-page">
          <div className="figma-container">
          <Text as="h1" unstyled className="figma-page-title">Venue not found</Text>
          <Link to="/search" className="figma-link">Back to Search</Link>
          </div>
        </main>
      </AppLayout>
    )
  }

  const availableHours = HOURS.filter((hour) => hour >= 6 && hour <= 22 && !UNAVAILABLE_HOURS.includes(hour))

  const selectedSlot = formatSelectedRanges(selectedHours)

  const toggleHourSelection = (hour: number) => {
    if (!availableHours.includes(hour)) {
      return
    }

    setSelectedHours((previous) => {
      if (previous.includes(hour)) {
        return previous.filter((item) => item !== hour)
      }

      return [...previous, hour].sort((left, right) => left - right)
    })
  }

  return (
    <AppLayout fullBleed showHeader={false} showFooter={false}>
      <main className="figma-page">
        <div className="figma-container">
        <section className="figma-hero-strip">
          <div className="figma-row">
            <Text as="h1" unstyled className="figma-page-title">{venue.name}</Text>
            <div className="figma-actions figma-top-actions">
              <Link to="/search" className="success-link">Back to Search</Link>
              <Link to="/bookings" className="success-link">My Bookings</Link>
              <Link to="/profile" className="success-link">Profile</Link>
            </div>
          </div>
          <Text as="p" unstyled className="figma-subtext">{venue.location} • {venue.distance} away</Text>
        </section>

        <section className="figma-detail-grid">
          <img className="figma-detail-image" src={venue.image} alt={venue.name} />
          <div className="figma-card">
            <Text as="p" unstyled className="figma-p">{venue.location}</Text>
            <Text as="p" unstyled className="figma-p">
              ★ {venue.rating} ({venue.reviews})
            </Text>
            <Text as="p" unstyled className="figma-price">₹{venue.pricePerHour}/hr</Text>
            <Text as="p" unstyled className="figma-p">{venue.available ? 'Slots available today' : 'Currently fully booked'}</Text>
            <div className="figma-tags">
              {venue.amenities.map((amenity) => (
                <span key={amenity}>{amenity}</span>
              ))}
            </div>

            {!showTimeline ? (
              <Button
                type="button"
                variant="unstyled"
                onClick={() => {
                  setShowTimeline(true)
                }}
              >
                Book Now
              </Button>
            ) : (
              <>
                <div className="figma-slot-head">
                  <Text as="h3" unstyled className="figma-h3">Select 1-Hour Slots (24-Hour Timeline)</Text>
                  <button
                    type="button"
                    className="figma-slot-info"
                    aria-label="Slot selection help"
                  >
                    i
                    <span className="figma-slot-tooltip">
                      Green = Available, Grey = Unavailable. You can select multiple 1-hour slots.
                    </span>
                  </button>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
                    gap: 8,
                    marginBottom: 14,
                  }}
                >
                  {HOURS.map((hour) => {
                    const isAvailable = availableHours.includes(hour)
                    const isSelected = selectedHours.includes(hour)

                    return (
                      <button
                        key={hour}
                        type="button"
                        onClick={() => toggleHourSelection(hour)}
                        disabled={!isAvailable}
                        style={{
                          border: isSelected ? '1px solid #0f7b45' : '1px solid rgba(21, 32, 43, 0.14)',
                          background: isSelected ? '#0f7b45' : isAvailable ? '#dff5e8' : '#eef1f3',
                          color: isSelected ? '#fff' : isAvailable ? '#0f7b45' : '#8b97a3',
                          borderRadius: 10,
                          padding: '10px 8px',
                          fontWeight: 700,
                          cursor: isAvailable ? 'pointer' : 'not-allowed',
                          opacity: isAvailable ? 1 : 0.7,
                          textAlign: 'left',
                        }}
                      >
                        <span style={{ display: 'block', fontSize: 12 }}>{formatHour(hour)}</span>
                        <span style={{ display: 'block', fontSize: 11, marginTop: 2 }}>+1h</span>
                      </button>
                    )
                  })}
                </div>

                <Text as="p" unstyled className="figma-p" style={{ marginBottom: 14, fontWeight: 700 }}>
                  {selectedHours.length > 0
                    ? `Selected: ${selectedSlot}`
                    : 'No slot selected yet.'}
                </Text>

                <div className="figma-slot-cta-row">
                  <Button
                    type="button"
                    variant="unstyled"
                    className="figma-slot-cta figma-slot-cta-primary"
                    onClick={() => {
                      const bookingData: BaseBookingData = {
                        pitchName: venue.name,
                        location: venue.location,
                        sport: venue.sport,
                        price: venue.pricePerHour,
                        selectedSlot,
                      }
                      navigate('/book', { state: { bookingData } })
                    }}
                    disabled={selectedHours.length === 0}
                  >
                    Continue to Booking
                  </Button>
                  <Button
                    type="button"
                    variant="unstyled"
                    className="figma-slot-cta figma-slot-cta-secondary"
                    onClick={() => setSelectedHours([])}
                    disabled={selectedHours.length === 0}
                  >
                    Clear Selection
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>
        </div>
      </main>
    </AppLayout>
  )
}

export default VenueDetail
