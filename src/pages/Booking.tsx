import { useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

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

type BookingState = {
  bookingData?: Omit<BookingData, 'customerName' | 'mobileNumber'>
}

const nameMinLength = 2
const nameMaxLength = 50

type CreateOrderResponse = {
  orderId: string
  amount: number
  currency: string
}

type RazorpayPaymentSuccessResponse = {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

type RazorpayOptions = {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  prefill: {
    name: string
    contact: string
  }
  handler: (response: RazorpayPaymentSuccessResponse) => void
  modal: {
    ondismiss: () => void
  }
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void
      on: (event: string, callback: () => void) => void
    }
  }
}

let razorpayScriptPromise: Promise<boolean> | null = null

function loadRazorpayScript() {
  if (window.Razorpay) {
    return Promise.resolve(true)
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise
  }

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true

    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)

    document.body.appendChild(script)
  })

  return razorpayScriptPromise
}

function getNameError(value: string): string {
  const trimmed = value.trim()

  if (!trimmed) {
    return 'Name is required.'
  }

  if (trimmed.length < nameMinLength) {
    return 'Name must be at least 2 characters.'
  }

  if (trimmed.length > nameMaxLength) {
    return 'Name must be at most 50 characters.'
  }

  return ''
}

function getMobileError(value: string): string {
  if (!value) {
    return 'Mobile number is required.'
  }

  if (!/^\d+$/.test(value)) {
    return 'Mobile number must contain digits only.'
  }

  if (value.length !== 10) {
    return 'Mobile number must be exactly 10 digits.'
  }

  return ''
}

function Booking() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as BookingState | null) ?? null
  const bookingData = state?.bookingData
  const selectedSlot = bookingData?.selectedSlot

  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [nameTouched, setNameTouched] = useState(false)
  const [mobileTouched, setMobileTouched] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState('')
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const nameError = useMemo(() => getNameError(name), [name])
  const mobileError = useMemo(() => getMobileError(mobileNumber), [mobileNumber])

  const isNameValid = nameError === ''
  const isMobileValid = mobileError === ''
  const canSubmit = Boolean(selectedSlot) && isNameValid && isMobileValid

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setNameTouched(true)
    setMobileTouched(true)
    setPaymentMessage('')

    if (!canSubmit || !selectedSlot) {
      return
    }

    void (async () => {
      const apiBaseUrl = import.meta.env['VITE_API_BASE_URL'] as string | undefined
      const razorpayKeyId = import.meta.env['VITE_RAZORPAY_KEY_ID'] as
        | string
        | undefined

      if (!apiBaseUrl || !razorpayKeyId) {
        setPaymentMessage('Unable to start payment.')
        return
      }

      setIsProcessingPayment(true)

      try {
        const orderResponse = await fetch(
          `${apiBaseUrl}/api/payment/create-order`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: bookingData.price }),
          },
        )

        if (!orderResponse.ok) {
          setPaymentMessage('Unable to start payment.')
          setIsProcessingPayment(false)
          return
        }

        const orderData = (await orderResponse.json()) as CreateOrderResponse
        const sdkLoaded = await loadRazorpayScript()

        if (!sdkLoaded || !window.Razorpay) {
          setPaymentMessage('Unable to start payment.')
          setIsProcessingPayment(false)
          return
        }

        const razorpay = new window.Razorpay({
          key: razorpayKeyId,
          order_id: orderData.orderId,
          amount: orderData.amount,
          currency: orderData.currency,
          name: bookingData.pitchName,
          description: `${bookingData.sport} slot booking`,
          prefill: {
            name: name.trim(),
            contact: mobileNumber,
          },
          modal: {
            ondismiss: () => {
              setPaymentMessage('Payment cancelled.')
              setIsProcessingPayment(false)
            },
          },
          handler: (response) => {
            const completeBookingData: BookingData = {
              ...bookingData,
              selectedSlot,
              customerName: name.trim(),
              mobileNumber,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            }

            setIsProcessingPayment(false)
            navigate('/success', { state: { bookingData: completeBookingData } })
          },
        })

        razorpay.on('payment.failed', () => {
          setPaymentMessage('Payment cancelled.')
          setIsProcessingPayment(false)
        })

        razorpay.open()
      } catch {
        setPaymentMessage('Unable to start payment.')
        setIsProcessingPayment(false)
      }
    })()
  }

  if (!bookingData || !selectedSlot) {
    return (
      <main style={{ maxWidth: '420px', margin: '2rem auto', textAlign: 'left' }}>
        <h1>Booking</h1>
        <p>No slot selected.</p>
        <p>Please return to the Home page.</p>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            marginTop: '1rem',
            padding: '0.65rem 1rem',
            borderRadius: '8px',
            border: '1px solid #1d4ed8',
            backgroundColor: '#2563eb',
            color: '#fff',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Return Home
        </button>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: '420px', margin: '2rem auto', textAlign: 'left' }}>
      <h1>Booking</h1>
      <p>
        <strong>Pitch:</strong> {bookingData.pitchName}
      </p>
      <p style={{ marginBottom: '1rem' }}>
        <strong>Selected Slot:</strong> {selectedSlot}
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '0.4rem' }}>
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onBlur={() => setNameTouched(true)}
            style={{
              width: '100%',
              padding: '0.6rem 0.65rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              boxSizing: 'border-box',
            }}
          />
          {nameTouched && nameError && (
            <p style={{ color: '#b91c1c', marginTop: '0.4rem' }} role="alert">
              {nameError}
            </p>
          )}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="mobileNumber"
            style={{ display: 'block', marginBottom: '0.4rem' }}
          >
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="text"
            value={mobileNumber}
            onChange={(event) => {
              const nextValue = event.target.value

              if (/^\d*$/.test(nextValue)) {
                setMobileNumber(nextValue)
              }
            }}
            onBlur={() => setMobileTouched(true)}
            inputMode="numeric"
            maxLength={10}
            style={{
              width: '100%',
              padding: '0.6rem 0.65rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              boxSizing: 'border-box',
            }}
          />
          {mobileTouched && mobileError && (
            <p style={{ color: '#b91c1c', marginTop: '0.4rem' }} role="alert">
              {mobileError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!canSubmit || isProcessingPayment}
          style={{
            padding: '0.7rem 1rem',
            borderRadius: '8px',
            border: '1px solid #1d4ed8',
            backgroundColor:
              canSubmit && !isProcessingPayment ? '#2563eb' : '#94a3b8',
            color: '#fff',
            fontWeight: 600,
            cursor:
              canSubmit && !isProcessingPayment ? 'pointer' : 'not-allowed',
          }}
        >
          {isProcessingPayment ? 'Processing...' : 'Book Now'}
        </button>

        {paymentMessage && (
          <p style={{ color: '#b91c1c', marginTop: '0.75rem' }} role="alert">
            {paymentMessage}
          </p>
        )}
      </form>

      <p style={{ marginTop: '1rem' }}>
        <Link to="/">Back Home</Link>
      </p>
    </main>
  )
}

export default Booking