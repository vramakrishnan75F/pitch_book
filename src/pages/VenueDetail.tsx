import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/ui/Button'
import Text from '../components/ui/Text'
import AppLayout from '../layouts/AppLayout'
import type { BaseBookingData } from '../types/booking'
import { figmaSlots, figmaVenues } from './figmaData'
import './FigmaSecondary.css'

function VenueDetail() {
  const navigate = useNavigate()
  const params = useParams()
  const venueId = Number(params.id)
  const venue = figmaVenues.find((item) => item.id === venueId)
  const [slot, setSlot] = useState(figmaSlots[0])

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

            <Text as="h3" unstyled className="figma-h3">Choose Slot</Text>
            <div className="figma-slots">
              {figmaSlots.map((item) => (
                <Button
                  key={item}
                  type="button"
                  variant="unstyled"
                  className={slot === item ? 'active' : ''}
                  onClick={() => setSlot(item)}
                >
                  {item}
                </Button>
              ))}
            </div>

            <Button
              type="button"
              variant="unstyled"
              onClick={() => {
                const bookingData: BaseBookingData = {
                  pitchName: venue.name,
                  location: venue.location,
                  sport: venue.sport,
                  price: venue.pricePerHour,
                  selectedSlot: slot,
                }
                navigate('/book', { state: { bookingData } })
              }}
            >
              Continue to Booking
            </Button>
          </div>
        </section>
        </div>
      </main>
    </AppLayout>
  )
}

export default VenueDetail
