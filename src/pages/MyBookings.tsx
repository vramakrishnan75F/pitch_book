import { Link } from 'react-router-dom'
import Text from '../components/ui/Text'
import AppLayout from '../layouts/AppLayout'
import './FigmaSecondary.css'

const bookings = [
  { id: 'GA-1024', venue: 'Elite Football Ground', date: '2026-07-23', slot: '7:00 PM - 8:00 PM', status: 'Upcoming' },
  { id: 'GA-0994', venue: 'BlueShuttle Badminton', date: '2026-07-11', slot: '8:00 PM - 9:00 PM', status: 'Completed' },
]

function MyBookings() {
  return (
    <AppLayout fullBleed showHeader={false} showFooter={false}>
      <main className="figma-page">
        <div className="figma-container">
        <section className="figma-hero-strip">
          <div className="figma-row">
            <Text as="h1" unstyled className="figma-page-title">My Bookings</Text>
            <div className="figma-actions figma-top-actions">
              <Link to="/search" className="success-link">Search</Link>
              <Link to="/profile" className="success-link">Profile</Link>
              <Link to="/" className="success-link success-link-primary">Back Home</Link>
            </div>
          </div>
          <Text as="p" unstyled className="figma-subtext">Track upcoming games and view your recent booking history.</Text>
        </section>

        <section className="figma-stack">
          {bookings.map((booking) => (
            <article key={booking.id} className="figma-card booking-history-card">
              <div className="figma-row booking-mini-row">
                <Text as="h3" unstyled className="figma-h3">{booking.venue}</Text>
                <span className={`booking-status ${booking.status === 'Upcoming' ? 'is-upcoming' : 'is-completed'}`}>
                  {booking.status}
                </span>
              </div>
              <Text as="p" unstyled className="figma-p">Booking ID: {booking.id}</Text>
              <Text as="p" unstyled className="figma-p">Date: {booking.date}</Text>
              <Text as="p" unstyled className="figma-p">Slot: {booking.slot}</Text>
              <div className="figma-actions">
                <Link to="/search" className="success-link">Book Similar</Link>
                <Link to="/" className="success-link success-link-primary">Home</Link>
              </div>
            </article>
          ))}
        </section>
        </div>
      </main>
    </AppLayout>
  )
}

export default MyBookings
