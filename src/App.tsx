import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Success from './pages/Success'
import Search from './pages/Search'
import VenueDetail from './pages/VenueDetail'
import MyBookings from './pages/MyBookings'
import Profile from './pages/Profile'

function restoreGlobalScroll() {
  document
    .querySelectorAll('.razorpay-container, .razorpay-backdrop, .razorpay-checkout-frame')
    .forEach((node) => node.remove())

  document.body.classList.remove('razorpay-open')
  document.documentElement.classList.remove('razorpay-open')

  document.documentElement.style.overflow = ''
  document.documentElement.style.position = ''
  document.documentElement.style.height = ''

  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  document.body.style.height = ''
  document.body.style.paddingRight = ''
  document.body.style.touchAction = ''
}

function App() {
  const location = useLocation()

  useEffect(() => {
    restoreGlobalScroll()
  }, [location.pathname, location.search])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/venue/:id" element={<VenueDetail />} />
      <Route path="/book" element={<Booking />} />
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  )
}

export default App
