import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { BaseBookingData } from '../types/booking'

const slots = [
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM',
  '8:00 PM - 9:00 PM',
  '9:00 PM - 10:00 PM',
]

const venueData = {
  pitchName: 'Victory Arena',
  location: 'Bangalore',
  sport: 'Football',
  price: 1200,
} as const

export function useHomeBooking() {
  const navigate = useNavigate()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const handleBookNow = () => {
    if (!selectedSlot) {
      setMessage('Please select a time slot.')
      return
    }

    const bookingData: BaseBookingData = {
      ...venueData,
      selectedSlot,
    }

    setMessage('')
    navigate('/book', { state: { bookingData } })
  }

  return {
    slots,
    venueData,
    selectedSlot,
    message,
    setSelectedSlot,
    setMessage,
    handleBookNow,
  }
}
