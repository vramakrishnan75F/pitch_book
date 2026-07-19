import { Link, useLocation } from 'react-router-dom'

interface BookingData {
  pitchName: string
  location: string
  sport: string
  price: number
  selectedSlot: string
  customerName: string
  mobileNumber: string
  paymentId?: string
  orderId?: string
}

type SuccessState = {
  bookingData?: BookingData
}

function Success() {
  const location = useLocation()
  const state = (location.state as SuccessState | null) ?? null
  const bookingData = state?.bookingData

  return (
    <main style={{ maxWidth: '420px', margin: '2rem auto', textAlign: 'left' }}>
      <h1>Success</h1>
      <p>Pitch: {bookingData?.pitchName ?? ''}</p>
      <p>Location: {bookingData?.location ?? ''}</p>
      <p>Sport: {bookingData?.sport ?? ''}</p>
      <p>Price: ₹{bookingData?.price ?? ''}</p>
      <p>Selected Slot: {bookingData?.selectedSlot ?? ''}</p>
      <p>Customer Name: {bookingData?.customerName ?? ''}</p>
      <p>Mobile Number: {bookingData?.mobileNumber ?? ''}</p>
      <p>Payment ID: {bookingData?.paymentId ?? ''}</p>
      <p>Order ID: {bookingData?.orderId ?? ''}</p>
      <Link to="/">Back Home</Link>
    </main>
  )
}

export default Success