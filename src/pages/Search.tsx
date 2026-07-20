import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Text from '../components/ui/Text'
import AppLayout from '../layouts/AppLayout'
import type { BaseBookingData } from '../types/booking'
import { figmaSlots, figmaVenues } from './figmaData'
import './FigmaSecondary.css'

function Search() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const sportFilter = params.get('sport')?.toLowerCase() ?? ''
  const locationFilter = params.get('location')?.toLowerCase() ?? ''
  const dateFilter = params.get('date') ?? ''

  const venues = figmaVenues.filter((venue) => {
    const sportMatch = sportFilter === '' || venue.sport.toLowerCase().includes(sportFilter)
    const locationMatch = locationFilter === '' || venue.location.toLowerCase().includes(locationFilter)
    return sportMatch && locationMatch
  })

  return (
    <AppLayout fullBleed showHeader={false} showFooter={false}>
      <main className="figma-page">
        <div className="figma-container">
        <section className="figma-hero-strip">
          <div className="figma-row">
            <Text as="h1" unstyled className="figma-page-title">Search Venues</Text>
            <div className="figma-actions figma-top-actions">
              <Link to="/bookings" className="success-link">My Bookings</Link>
              <Link to="/profile" className="success-link">Profile</Link>
              <Link to="/" className="success-link success-link-primary">Back Home</Link>
            </div>
          </div>
          <Text as="p" unstyled className="figma-subtext">Find premium grounds and courts near your location.</Text>
          <div className="figma-tags">
            <span>Location: {locationFilter || 'Any'}</span>
            <span>Sport: {sportFilter || 'Any'}</span>
            <span>Date: {dateFilter || 'Flexible'}</span>
            <span>{venues.length} Venues Found</span>
          </div>
        </section>

        {venues.length === 0 ? (
          <section className="figma-card figma-empty">
            <p>No venues found for this filter.</p>
          </section>
        ) : (
          <section className="figma-grid">
            {venues.map((venue) => (
              <article key={venue.id} className="figma-card figma-venue-card">
                <img src={venue.image} alt={venue.name} />
                <div className="figma-card-body">
                  <Text as="h3" unstyled className="figma-h3">{venue.name}</Text>
                  <Text as="p" unstyled className="figma-p">{venue.location}</Text>
                  <Text as="p" unstyled className="figma-p">{venue.distance} away</Text>
                  <Text as="p" unstyled className="figma-p">
                    ★ {venue.rating} ({venue.reviews})
                  </Text>
                  <Text as="p" unstyled className="figma-price">₹{venue.pricePerHour}/hr</Text>
                  <div className="figma-tags figma-compact-tags">
                    {venue.amenities.map((amenity) => (
                      <span key={amenity}>{amenity}</span>
                    ))}
                  </div>
                  <div className="figma-actions">
                    <Button type="button" variant="unstyled" onClick={() => navigate(`/venue/${venue.id}`)}>
                      View Details
                    </Button>
                    <Button
                      type="button"
                      variant="unstyled"
                      onClick={() => {
                        const bookingData: BaseBookingData = {
                          pitchName: venue.name,
                          location: venue.location,
                          sport: venue.sport,
                          price: venue.pricePerHour,
                          selectedSlot: figmaSlots[0],
                        }
                        navigate('/book', { state: { bookingData } })
                      }}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
        </div>
      </main>
    </AppLayout>
  )
}

export default Search
