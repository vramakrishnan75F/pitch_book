import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  Calendar,
  Camera,
  Clock,
  Globe2,
  Heart,
  MapPin,
  Search,
  Send,
  Shield,
  Star,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import FieldError from '../components/ui/FieldError'
import { useHomeBooking } from '../hooks/useHomeBooking'
import AppLayout from '../layouts/AppLayout'
import type { BaseBookingData } from '../types/booking'
import './Home.css'

const sports = [
  { id: 'football', label: 'Football', icon: '⚽', count: '240+' },
  { id: 'cricket', label: 'Cricket', icon: '🏏', count: '85+' },
  { id: 'badminton', label: 'Badminton', icon: '🏸', count: '320+' },
  { id: 'tennis', label: 'Tennis', icon: '🎾', count: '160+' },
]

const venues = [
  {
    id: 1,
    name: 'Elite Football Ground',
    location: 'Whitefield, Bangalore',
    distance: '1.2 km',
    rating: 4.9,
    reviews: 284,
    pricePerHour: 800,
    sport: 'Football',
    badge: 'Top Rated',
    available: true,
    amenities: ['Floodlights', 'Parking'],
    image:
      'https://images.unsplash.com/photo-1513609698234-16d36e4b7a65?w=960&h=560&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'SkyLine Tennis Club',
    location: 'Koramangala, Bangalore',
    distance: '2.4 km',
    rating: 4.8,
    reviews: 192,
    pricePerHour: 600,
    sport: 'Tennis',
    badge: 'Trending',
    available: true,
    amenities: ['3 Courts', 'Café'],
    image:
      'https://images.unsplash.com/photo-1761404984667-16d6c9158c59?w=960&h=560&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'BlueShuttle Badminton',
    location: 'Indiranagar, Bangalore',
    distance: '3.1 km',
    rating: 4.7,
    reviews: 438,
    pricePerHour: 350,
    sport: 'Badminton',
    badge: 'Popular',
    available: true,
    amenities: ['8 Courts', 'AC'],
    image:
      'https://images.unsplash.com/photo-1718452739586-5b467f1f109b?w=960&h=560&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'Urban Hoops Arena',
    location: 'HSR Layout, Bangalore',
    distance: '4.8 km',
    rating: 4.6,
    reviews: 156,
    pricePerHour: 500,
    sport: 'Basketball',
    badge: null,
    available: false,
    amenities: ['Full Court', 'Flood Lights'],
    image:
      'https://images.unsplash.com/photo-1590227632180-80a3bf110871?w=960&h=560&fit=crop&auto=format',
  },
]

const howItWorks = [
  { step: '01', icon: '🔍', title: 'Discover', desc: 'Search for venues near you by sport, location, date and time.' },
  { step: '02', icon: '📅', title: 'Book a Slot', desc: 'Pick your preferred time slot and secure it in under 60 seconds.' },
  { step: '03', icon: '⚽', title: 'Play & Enjoy', desc: 'Show up, play your game, and build your sports community.' },
]

const tournaments = [
  {
    title: 'Sunday Premier League',
    sport: 'Football',
    date: 'Aug 3 - Sep 14, 2025',
    teams: '16 Teams',
    prize: '₹50,000',
    tag: 'Registration Open',
    image:
      'https://images.unsplash.com/photo-1679391029864-d46f366a456b?w=700&h=440&fit=crop&auto=format',
  },
  {
    title: 'City Badminton Open',
    sport: 'Badminton',
    date: 'Aug 10 - Aug 12, 2025',
    teams: '64 Players',
    prize: '₹20,000',
    tag: 'Closing Soon',
    image:
      'https://images.unsplash.com/photo-1718452739586-5b467f1f109b?w=700&h=440&fit=crop&auto=format',
  },
]

const testimonials = [
  { name: 'Arjun Mehta', role: 'Weekend Footballer', avatar: 'AM', quote: 'GoArena changed how our group books grounds. No more WhatsApp chaos - just find, book, and play.', rating: 5 },
  { name: 'Priya Sharma', role: 'Badminton Enthusiast', avatar: 'PS', quote: 'Love how easy it is to book a court at BlueShuttle. The whole process takes less than a minute.', rating: 5 },
  { name: 'Rahul Nair', role: 'Tennis Coach', avatar: 'RN', quote: 'My students use GoArena every week. The slot availability is always accurate - no surprises.', rating: 5 },
]

function Home() {
  const navigate = useNavigate()
  const [searchLocation, setSearchLocation] = useState('Bangalore')
  const [searchSport, setSearchSport] = useState('football')
  const [searchDate, setSearchDate] = useState('2025-08-03')
  const [activeSport, setActiveSport] = useState('football')
  const [activeTab, setActiveTab] = useState<'venues' | 'open'>('venues')
  const [wishlist, setWishlist] = useState<number[]>([])

  const { slots, selectedSlot, message, setSelectedSlot, setMessage } = useHomeBooking()

  useEffect(() => {
    if (!selectedSlot && slots.length > 0) {
      setSelectedSlot(slots[0])
    }
  }, [selectedSlot, setSelectedSlot, slots])

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <AppLayout fullBleed showHeader={false} showFooter={false}>
      <div className="landing-root">
        <section className="landing-hero">
          <img
            src="https://images.unsplash.com/photo-1630047254778-cfd0c27381de?w=1800&h=960&fit=crop&auto=format"
            alt="Sports arena illuminated at night"
            className="landing-hero-bg"
          />
          <div className="landing-hero-overlay" />

          <div className="landing-shell landing-hero-content">
            <div className="landing-top-nav">
              <button type="button" className="top-nav-brand" onClick={() => navigate('/')}>
                GoArena
              </button>
              <div className="top-nav-links">
                <button type="button" onClick={() => navigate('/search')}>Search</button>
                <button type="button" onClick={() => navigate('/bookings')}>My Bookings</button>
                <button type="button" onClick={() => navigate('/profile')}>Profile</button>
              </div>
            </div>

            <div className="landing-hero-inner">
              <div className="landing-live-badge">
                <span className="live-dot" />
                320+ venues available today
              </div>
              <h1 className="landing-hero-title">
                Find Your
                <br />
                <span className="highlight">Next Game.</span>
              </h1>
              <p className="landing-hero-subtitle">
                Discover and book premium sports venues near you. Football, Cricket, Badminton, Tennis and more.
              </p>

              <div className="landing-hero-footer-row">
                <div className="landing-search-grid">
                  <div className="search-field">
                    <MapPin className="icon-svg" size={18} />
                    <input
                      placeholder="Your city or area"
                      value={searchLocation}
                      onChange={(event) => setSearchLocation(event.target.value)}
                    />
                  </div>
                  <div className="search-divider" />
                  <div className="search-field">
                    <span className="search-icon">⚽</span>
                    <select
                      value={searchSport}
                      onChange={(event) => setSearchSport(event.target.value)}
                    >
                      <option value="">Any Sport</option>
                      {sports.map((sport) => (
                        <option key={sport.id} value={sport.id}>{sport.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="search-divider" />
                  <div className="search-field">
                    <Calendar className="icon-svg" size={18} />
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(event) => setSearchDate(event.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="search-button"
                    onClick={() => {
                      const params = new URLSearchParams()
                      if (searchLocation) {
                        params.set('location', searchLocation)
                      }
                      if (searchSport) {
                        params.set('sport', searchSport)
                      }
                      if (searchDate) {
                        params.set('date', searchDate)
                      }

                      const query = params.toString()
                      navigate(query ? `/search?${query}` : '/search')
                    }}
                  >
                    <Search className="icon-svg" size={16} />
                    <span>Search</span>
                  </button>
                </div>

                <div className="landing-stats-row">
                  <div>
                    <div className="stat-value">500+</div>
                    <div className="stat-label">Venues</div>
                  </div>
                  <div>
                    <div className="stat-value">1.2M+</div>
                    <div className="stat-label">Bookings</div>
                  </div>
                  <div>
                    <div className="stat-value">4.9★</div>
                    <div className="stat-label">Avg Rating</div>
                  </div>
                </div>
              </div>

              {message && <FieldError message={message} />}
            </div>
          </div>
        </section>

        <section className="landing-sports">
          <div className="landing-shell">
            <div className="section-header-row">
              <h2>Browse by Sport</h2>
              <button type="button" className="text-link" onClick={() => navigate('/search')}>
                View all <ArrowRight size={14} />
              </button>
            </div>
            <div className="sports-grid">
              {sports.map((sport) => (
                <button
                  key={sport.id}
                  type="button"
                  className="landing-chip"
                  onClick={() => {
                    setActiveSport(sport.id)
                    setSearchSport(sport.id)
                  }}
                  data-active={activeSport === sport.id}
                >
                  <span className="landing-chip-icon">{sport.icon}</span>
                  <span className="chip-label">{sport.label}</span>
                  <span className="chip-count">{sport.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

      <section className="landing-venues">
        <div className="landing-shell">
          <div className="featured-toolbar">
            <div className="tab-group">
              {(['venues', 'open'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className="tab-btn"
                  data-active={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'venues' ? 'Featured Venues' : 'Open Games'}
                </button>
              ))}
            </div>
            <button type="button" className="text-link" onClick={() => navigate('/search')}>
              See all venues <ArrowRight size={14} />
            </button>
          </div>

          {activeTab === 'venues' ? (
            <div className="venue-cards-grid">
              {venues.map((venue) => (
                <article key={venue.id} className="venue-card" onClick={() => navigate(`/venue/${venue.id}`)}>
                  <div className="venue-image-wrap">
                    <img src={venue.image} alt={venue.name} />
                    <div className="venue-image-top">
                      {venue.badge ? <span className="venue-badge">{venue.badge}</span> : <span />}
                      <button
                        type="button"
                        className="wish-btn"
                        onClick={() => toggleWishlist(venue.id)}
                        aria-label="Toggle wishlist"
                      >
                        <Heart
                          className="heart-icon"
                          size={16}
                          fill={wishlist.includes(venue.id) ? 'currentColor' : 'none'}
                        />
                      </button>
                    </div>
                    <div className="venue-image-bottom">
                      <span className={venue.available ? 'availability available' : 'availability unavailable'}>
                        {venue.available ? 'Slots Available' : 'Fully Booked'}
                      </span>
                    </div>
                  </div>

                  <div className="venue-card-body">
                    <h3>{venue.name}</h3>
                    <div className="venue-meta">
                      <span>{venue.location}</span>
                      <span>{venue.distance}</span>
                    </div>
                    <div className="venue-meta-row">
                      <span><Star className="inline-star" size={12} fill="currentColor" /> {venue.rating} ({venue.reviews})</span>
                      <span className="venue-price">₹{venue.pricePerHour}/hr</span>
                    </div>
                    <div className="amenity-row">
                      {venue.amenities.map((amenity) => (
                        <span key={amenity} className="amenity-chip">{amenity}</span>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="book-btn"
                      onClick={(event) => {
                        event.stopPropagation()
                        const slot = slots[0] ?? '6:00 PM - 7:00 PM'
                        if (slots.length > 0) {
                          setSelectedSlot(slot)
                        }

                        const bookingData: BaseBookingData = {
                          pitchName: venue.name,
                          location: venue.location,
                          sport: venue.sport,
                          price: venue.pricePerHour,
                          selectedSlot: slot,
                        }

                        setMessage('')
                        navigate('/book', { state: { bookingData } })
                      }}
                    >
                      Book Now
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="open-games-card">
              <div className="open-games-emoji">🏃</div>
              <h3>Find Open Games Near You</h3>
              <p>
                Join ongoing games and meet new players. Select your sport and area to see what is happening today.
              </p>
              <button type="button" className="book-btn">Browse Open Games</button>
            </div>
          )}
        </div>
      </section>

      <section className="landing-how">
        <div className="landing-shell">
          <div className="how-header">
            <h2>How GoArena Works</h2>
            <p>Book your next game in under 60 seconds.</p>
          </div>
        <div className="landing-steps-grid">
          {howItWorks.map((step) => (
            <article key={step.step} className="how-card">
              <div className="how-icon">{step.icon}</div>
              <div className="how-step">Step {step.step}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section className="landing-tournament-section">
        <div className="landing-shell">
          <div className="section-header-row">
            <h2>Compete & Win</h2>
            <button type="button" className="text-link" onClick={() => navigate('/search')}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          <div className="landing-tournament-grid">
          {tournaments.map((tournament) => (
            <article key={tournament.title} className="landing-tournament-card">
              <img src={tournament.image} alt={tournament.title} />
              <div className="landing-tournament-overlay" />
              <div className="landing-tournament-content">
                <span className="landing-tag">{tournament.tag}</span>
                <span className="tournament-sport">{tournament.sport}</span>
                <h3>{tournament.title}</h3>
                <p>{tournament.date} • {tournament.teams} • {tournament.prize}</p>
              </div>
            </article>
          ))}
          </div>
        </div>
      </section>

      <section className="landing-testimonials">
        <div className="landing-shell">
          <div className="testimonial-header">
            <h2>Loved by Players</h2>
            <p>Real stories from the GoArena community</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="testimonial-card">
                <div className="stars">
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <Star key={`${item.name}-${index}`} className="star-icon" size={13} fill="currentColor" />
                  ))}
                </div>
                <p className="quote">"{item.quote}"</p>
                <div className="person-row">
                  <div className="avatar">{item.avatar}</div>
                  <div>
                    <div className="person-name">{item.name}</div>
                    <div className="person-role">{item.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-app-cta">
        <div className="landing-shell landing-app-cta-grid">
          <div>
            <div className="cta-pill"><Zap className="icon-svg" size={14} /> <span>Coming to iOS & Android</span></div>
            <h2>Your Game,<br /><span>Anywhere.</span></h2>
            <p>Book courts, join games, and manage your sports life from your pocket. The GoArena app is coming soon.</p>
            <div className="store-buttons">
              <button type="button" className="store-btn white">🍎 App Store</button>
              <button type="button" className="store-btn dark">▶ Google Play</button>
            </div>
          </div>
          <div className="landing-app-cards">
            <article className="app-info-card"><h3><Shield className="card-icon" size={18} /> Secure Payments</h3><p>PCI-DSS compliant checkout</p></article>
            <article className="app-info-card"><h3><Clock className="card-icon" size={18} /> Instant Booking</h3><p>Confirmed in under 60s</p></article>
            <article className="app-info-card"><h3><Users className="card-icon" size={18} /> 50K+ Players</h3><p>Active sports community</p></article>
            <article className="app-info-card"><h3><Trophy className="card-icon" size={18} /> 500+ Venues</h3><p>Across 12 cities</p></article>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-shell landing-footer-grid">
          <div>
            <h3 className="logo">Go<span>Arena</span></h3>
            <p className="footer-copy">Find. Book. Play. The world's most trusted platform for discovering and booking sports venues.</p>
            <div className="social-row">
              <a href="#" aria-label="Social media camera"><Camera size={14} /></a>
              <a href="#" aria-label="Social media send"><Send size={14} /></a>
              <a href="#" aria-label="Social media globe"><Globe2 size={14} /></a>
            </div>
          </div>
          <div>
            <h4>Platform</h4>
            <a href="#">Venues</a>
            <a href="#">Open Games</a>
            <a href="#">Tournaments</a>
            <a href="#">Communities</a>
          </div>
          <div>
            <h4>Sports</h4>
            <a href="#">Football</a>
            <a href="#">Cricket</a>
            <a href="#">Badminton</a>
            <a href="#">Tennis</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Careers</a>
            <a href="#">Blog</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="landing-shell footer-bottom">
          <p>© 2025 GoArena Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="footer-policy-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>

      </div>
    </AppLayout>
  )
}

export default Home