import { Link } from 'react-router-dom'
import Text from '../components/ui/Text'
import AppLayout from '../layouts/AppLayout'
import './FigmaSecondary.css'

function Profile() {
  return (
    <AppLayout fullBleed showHeader={false} showFooter={false}>
      <main className="figma-page">
        <div className="figma-container">
        <section className="figma-hero-strip">
          <div className="figma-row">
            <Text as="h1" unstyled className="figma-page-title">Profile</Text>
            <div className="figma-actions figma-top-actions">
              <Link to="/search" className="success-link">Search</Link>
              <Link to="/bookings" className="success-link">My Bookings</Link>
              <Link to="/" className="success-link success-link-primary">Back Home</Link>
            </div>
          </div>
          <Text as="p" unstyled className="figma-subtext">Manage your sports preferences and track engagement.</Text>
        </section>

        <section className="figma-detail-grid">
          <article className="figma-card">
            <Text as="h3" unstyled className="figma-h3">Vinay R</Text>
            <Text as="p" unstyled className="figma-p">vinay@example.com</Text>
            <Text as="p" unstyled className="figma-p">Bangalore</Text>
            <div className="figma-tags">
              <span>Football</span>
              <span>Badminton</span>
              <span>Tennis</span>
            </div>
          </article>

          <article className="figma-card">
            <Text as="h3" unstyled className="figma-h3">Player Summary</Text>
            <div className="success-grid profile-grid">
              <Text as="p" unstyled className="figma-p"><strong>Bookings:</strong> 42</Text>
              <Text as="p" unstyled className="figma-p"><strong>Hours Played:</strong> 96</Text>
              <Text as="p" unstyled className="figma-p"><strong>Favorite Sport:</strong> Badminton</Text>
              <Text as="p" unstyled className="figma-p"><strong>City Rank:</strong> #178</Text>
            </div>
            <div className="figma-actions">
              <Link to="/bookings" className="success-link">View Bookings</Link>
              <Link to="/search" className="success-link success-link-primary">Book New Slot</Link>
            </div>
          </article>
        </section>
        </div>
      </main>
    </AppLayout>
  )
}

export default Profile
