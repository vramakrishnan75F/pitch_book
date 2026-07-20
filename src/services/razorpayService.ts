import type { BookingData } from '../types/booking'
import type { CreateOrderResponse } from '../repositories/paymentRepository'

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
      on: (event: string, callback: (response?: unknown) => void) => void
    }
  }
}

let razorpayScriptPromise: Promise<boolean> | null = null

function injectRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    const existing = document.querySelector('script[data-razorpay-checkout="true"]')
    if (existing) {
      existing.remove()
    }

    const script = document.createElement('script')
    script.src = `https://checkout.razorpay.com/v1/checkout.js?ts=${Date.now()}`
    script.async = true
    script.setAttribute('data-razorpay-checkout', 'true')

    const timeout = window.setTimeout(() => {
      resolve(false)
    }, 10000)

    script.onload = () => {
      window.clearTimeout(timeout)
      resolve(true)
    }

    script.onerror = () => {
      window.clearTimeout(timeout)
      resolve(false)
    }

    document.body.appendChild(script)
  })
}

export function loadRazorpayScript(): Promise<boolean> {
  if (window.Razorpay) {
    return Promise.resolve(true)
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise
  }

  const loadPromise = (async () => {
    const firstAttempt = await injectRazorpayScript()
    if (firstAttempt || window.Razorpay) {
      return true
    }

    // Retry once for transient blockers/network hiccups.
    const secondAttempt = await injectRazorpayScript()
    return secondAttempt || Boolean(window.Razorpay)
  })()

  razorpayScriptPromise = loadPromise

  loadPromise.finally(() => {
    razorpayScriptPromise = null
  })

  return loadPromise
}

export function createRazorpayInstance(params: {
  keyId: string
  order: CreateOrderResponse
  bookingData: BookingData
  customerName: string
  mobileNumber: string
  onDismiss: () => void
  onSuccess: (response: RazorpayPaymentSuccessResponse) => void
}) {
  const { keyId, order, bookingData, customerName, mobileNumber, onDismiss, onSuccess } =
    params

  if (!window.Razorpay) {
    return null
  }

  return new window.Razorpay({
    key: keyId,
    order_id: order.orderId,
    amount: order.amount,
    currency: order.currency,
    name: bookingData.pitchName,
    description: `${bookingData.sport} slot booking`,
    prefill: {
      name: customerName,
      contact: mobileNumber,
    },
    modal: {
      ondismiss: onDismiss,
    },
    handler: onSuccess,
  })
}
