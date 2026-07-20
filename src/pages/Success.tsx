import { Link, useLocation } from 'react-router-dom'
import Text from '../components/ui/Text'
import StatusLayout from '../layouts/StatusLayout'
import type { SuccessState } from '../types/booking'
import './FigmaSecondary.css'

function Success() {
  const location = useLocation()
  const state = (location.state as SuccessState | null) ?? null
  const bookingData = state?.bookingData
  const hasBookingData = Boolean(bookingData)
  const showValue = (value: string | number | undefined) => (value === undefined || value === '' ? '-' : value)
  const priceValue = bookingData?.price === undefined ? '-' : `₹${bookingData.price}`

  const rows = [
    { label: 'Pitch', value: showValue(bookingData?.pitchName) },
    { label: 'Location', value: showValue(bookingData?.location) },
    { label: 'Sport', value: showValue(bookingData?.sport) },
    { label: 'Price', value: priceValue },
    { label: 'Selected Slot', value: showValue(bookingData?.selectedSlot) },
    { label: 'Customer Name', value: showValue(bookingData?.customerName) },
    { label: 'Mobile Number', value: showValue(bookingData?.mobileNumber) },
    { label: 'Payment ID', value: showValue(bookingData?.paymentId) },
    { label: 'Order ID', value: showValue(bookingData?.orderId) },
  ]

  return (
    <StatusLayout>
      <main className="figma-page">
        <div className="figma-container">
        <section className="figma-hero-strip">
          <div className="figma-row">
            <Text as="h1" unstyled className="figma-page-title">{hasBookingData ? 'Payment Successful' : 'Booking Status'}</Text>
            <div className="figma-actions figma-top-actions">
              <Link to="/search" className="success-link">Search</Link>
              <Link to="/bookings" className="success-link">My Bookings</Link>
              <Link to="/profile" className="success-link">Profile</Link>
            </div>
          </div>
          <Text as="p" unstyled className="figma-subtext">
            {hasBookingData
              ? 'Your booking is now confirmed and ready.'
              : 'No booking payload was found for this session.'}
          </Text>
        </section>

        <section className="figma-card success-card">
          <div className="success-head">
            <span className="success-badge">Confirmed</span>
            <Text as="h1" unstyled className="figma-page-title">{hasBookingData ? 'Booking Confirmed' : 'Summary Unavailable'}</Text>
            <Text as="p" unstyled className="success-subtitle">
              {hasBookingData
                ? 'Your slot is locked in. See you on the field.'
                : 'You can still explore venues and create a new booking.'}
            </Text>
          </div>

          <div className="success-fields">
            {rows.map((row) => (
              <div key={row.label} className="success-field-row">
                <span className="success-field-label">{row.label}</span>
                <span className="success-field-value">{row.value}</span>
              </div>
            ))}
          </div>

          <div className="figma-actions">
            <Link to="/bookings" className="success-link">My Bookings</Link>
            <Link to="/" className="success-link success-link-primary">Back Home</Link>
          </div>
        </section>
        </div>
      </main>
    </StatusLayout>
  )
}

export default Success