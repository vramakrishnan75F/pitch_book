import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

type HomeBookingData = {
  pitchName: string
  location: string
  sport: string
  price: number
  selectedSlot: string
}

function Home() {
  const navigate = useNavigate()
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const pitchName = 'Victory Arena'
  const pitchLocation = 'Bangalore'
  const sport = 'Football'
  const price = 1200

  const slots = [
    '6:00 PM - 7:00 PM',
    '7:00 PM - 8:00 PM',
    '8:00 PM - 9:00 PM',
    '9:00 PM - 10:00 PM',
  ]

  const handleBookNow = () => {
    if (!selectedSlot) {
      setMessage('Please select a time slot.')
      return
    }

    const bookingData: HomeBookingData = {
      pitchName,
      location: pitchLocation,
      sport,
      price,
      selectedSlot,
    }

    setMessage('')
    navigate('/book', { state: { bookingData } })
  }

  return (
    <main style={{ maxWidth: '420px', margin: '2rem auto', textAlign: 'left' }}>
      <h1 style={{ marginBottom: '1rem' }}>PitchFlow</h1>

      <h2 style={{ marginBottom: '0.5rem' }}>{pitchName}</h2>
      <p>{sport}</p>
      <p>{pitchLocation}</p>
      <p style={{ marginBottom: '1rem' }}>₹{price} per hour</p>

      <h3 style={{ marginBottom: '0.75rem' }}>Available Today</h3>
      <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '1rem' }}>
        {slots.map((slot) => {
          const isSelected = selectedSlot === slot

          return (
            <button
              key={slot}
              type="button"
              onClick={() => {
                setSelectedSlot(slot)
                setMessage('')
              }}
              style={{
                textAlign: 'left',
                padding: '0.6rem 0.75rem',
                borderRadius: '8px',
                border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                backgroundColor: isSelected ? '#dbeafe' : '#ffffff',
                color: '#111827',
                cursor: 'pointer',
              }}
            >
              {slot}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={handleBookNow}
        style={{
          padding: '0.7rem 1rem',
          borderRadius: '8px',
          border: '1px solid #1d4ed8',
          backgroundColor: '#2563eb',
          color: '#fff',
          fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Book Now
      </button>

      {message && (
        <p style={{ color: '#b91c1c', marginTop: '0.75rem' }} role="alert">
          {message}
        </p>
      )}
    </main>
  )
}

export default Home