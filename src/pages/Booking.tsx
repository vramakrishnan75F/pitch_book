import { Link, useLocation } from 'react-router-dom'
import Button from '../components/ui/Button'
import FieldError from '../components/ui/FieldError'
import Form from '../components/ui/Form'
import FormField from '../components/ui/FormField'
import HelperText from '../components/ui/HelperText'
import Label from '../components/ui/Label'
import Text from '../components/ui/Text'
import TextInput from '../components/ui/TextInput'
import { useBookingPayment } from '../hooks/useBookingPayment'
import BookingLayout from '../layouts/BookingLayout'
import type { BookingState } from '../types/booking'
import './FigmaSecondary.css'

function Booking() {
  const location = useLocation()
  const state = (location.state as BookingState | null) ?? null
  const bookingData = state?.bookingData
  const {
    selectedSlot,
    name,
    setName,
    mobileNumber,
    setMobileNumber,
    nameTouched,
    setNameTouched,
    mobileTouched,
    setMobileTouched,
    nameError,
    mobileError,
    isProcessingPayment,
    paymentMessage,
    submit,
  } = useBookingPayment({ bookingData })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void submit()
  }

  if (!bookingData || !selectedSlot) {
    return (
      <BookingLayout>
        <main className="figma-page">
          <div className="figma-container">
          <section className="figma-hero-strip">
            <div className="figma-row">
              <Text as="h1" unstyled className="figma-page-title">Booking</Text>
              <div className="figma-actions figma-top-actions">
                <Link to="/search" className="success-link">Search</Link>
                <Link to="/" className="success-link success-link-primary">Back Home</Link>
              </div>
            </div>
            <Text as="p" unstyled className="figma-subtext">Select a venue and slot first to continue with payment.</Text>
          </section>

          <section className="figma-card figma-empty">
            <Text as="p" unstyled className="figma-p">No slot selected. Please return to the Home page.</Text>
          </section>
          </div>
        </main>
      </BookingLayout>
    )
  }

  return (
    <BookingLayout>
      <main className="figma-page">
        <div className="figma-container">
        <section className="figma-hero-strip">
          <div className="figma-row">
            <Text as="h1" unstyled className="figma-page-title">Complete Booking</Text>
            <div className="figma-actions figma-top-actions">
              <Link to="/search" className="success-link">Search</Link>
              <Link to="/bookings" className="success-link">My Bookings</Link>
              <Link to="/profile" className="success-link">Profile</Link>
              <Link to="/" className="success-link success-link-primary">Back Home</Link>
            </div>
          </div>
          <Text as="p" unstyled className="figma-subtext">Review details, confirm identity, and complete payment securely.</Text>
        </section>

        <section className="figma-detail-grid booking-grid">
          <article className="figma-card booking-summary">
            <Text as="h3" unstyled className="figma-h3">Booking Details</Text>
            <Text as="p" unstyled className="figma-p"><strong>Pitch:</strong> {bookingData.pitchName}</Text>
            <Text as="p" unstyled className="figma-p"><strong>Location:</strong> {bookingData.location}</Text>
            <Text as="p" unstyled className="figma-p"><strong>Sport:</strong> {bookingData.sport}</Text>
            <Text as="p" unstyled className="figma-p"><strong>Selected Slot:</strong> {selectedSlot}</Text>
            <Text as="p" unstyled className="figma-price">₹{bookingData.price}/hr</Text>
            <div className="figma-tags">
              <span>Instant Confirmation</span>
              <span>Verified Venue</span>
              <span>Secure Payment</span>
            </div>
          </article>

          <article className="figma-card">
            <Text as="h3" unstyled className="figma-h3">Your Details</Text>
            <Form className="figma-form" onSubmit={handleSubmit} noValidate>
              <FormField>
                <Label htmlFor="name">Name</Label>
                <TextInput
                id="name"
                name="name"
                value={name}
                onChange={(nextValue) => setName(nextValue)}
                onBlur={() => setNameTouched(true)}
                style={{
                  border: '1px solid rgba(21, 32, 43, 0.14)',
                  borderRadius: '10px',
                  padding: '12px 12px',
                  fontSize: '15px',
                }}
                />
                {!nameTouched && <HelperText message="Enter your full name" />}
                {nameTouched && nameError && <FieldError message={nameError} />}
              </FormField>

              <FormField>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <TextInput
                id="mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={(nextValue) => {
                  if (/^\d*$/.test(nextValue)) {
                    setMobileNumber(nextValue)
                  }
                }}
                onBlur={() => setMobileTouched(true)}
                inputMode="numeric"
                maxLength={10}
                style={{
                  border: '1px solid rgba(21, 32, 43, 0.14)',
                  borderRadius: '10px',
                  padding: '12px 12px',
                  fontSize: '15px',
                }}
                />
                {!mobileTouched && <HelperText message="Enter 10-digit mobile number" />}
                {mobileTouched && mobileError && <FieldError message={mobileError} />}
              </FormField>

              <Button type="submit" variant="unstyled" disabled={isProcessingPayment} className="figma-pay-btn">
                {isProcessingPayment ? 'Processing...' : 'Pay & Confirm'}
              </Button>

              {paymentMessage && <FieldError message={paymentMessage} />}
            </Form>
          </article>
        </section>
        </div>
      </main>
    </BookingLayout>
  )
}

export default Booking