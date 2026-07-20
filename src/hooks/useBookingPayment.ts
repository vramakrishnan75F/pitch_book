import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { BaseBookingData, BookingData } from '../types/booking'
import { getMobileError, getNameError } from '../utilities/validation'
import { requestPaymentOrder } from '../services/paymentService'
import { createRazorpayInstance, loadRazorpayScript } from '../services/razorpayService'

type UseBookingPaymentOptions = {
  bookingData?: BaseBookingData
}

function cleanupStaleRazorpayUi() {
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

export function useBookingPayment({ bookingData }: UseBookingPaymentOptions) {
  const navigate = useNavigate()
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

  const parseApiErrorMessage = (payloadText: string): string => {
    try {
      const parsed = JSON.parse(payloadText) as { error?: string; message?: string }
      if (parsed.error && parsed.error.trim()) {
        return parsed.error
      }
      if (parsed.message && parsed.message.trim()) {
        return parsed.message
      }
    } catch {
      // Fallback to raw text when response is not JSON.
    }

    return payloadText.trim() || 'Unknown error from payment server.'
  }

  const submit = async () => {
    setNameTouched(true)
    setMobileTouched(true)
    setPaymentMessage('')
    cleanupStaleRazorpayUi()

    if (!bookingData || !selectedSlot) {
      setPaymentMessage('Please select a venue and slot before payment.')
      return
    }

    if (!canSubmit) {
      if (!isNameValid) {
        setPaymentMessage(nameError)
        return
      }

      if (!isMobileValid) {
        setPaymentMessage(mobileError)
        return
      }

      setPaymentMessage('Please complete all required details.')
      return
    }

    const apiBaseUrl = import.meta.env['VITE_API_BASE_URL'] as string | undefined
    const razorpayKeyId = import.meta.env['VITE_RAZORPAY_KEY_ID'] as string | undefined

    if (!apiBaseUrl || !razorpayKeyId) {
      setPaymentMessage('Payment config missing. Check VITE_API_BASE_URL and VITE_RAZORPAY_KEY_ID.')
      return
    }

    setIsProcessingPayment(true)

    try {
      let settled = false
      let checkoutWatchdogTimer: number | undefined
      let checkoutProbeTimer: number | undefined
      const finishFlow = (message?: string) => {
        if (settled) {
          return false
        }

        settled = true
        if (checkoutWatchdogTimer !== undefined) {
          window.clearTimeout(checkoutWatchdogTimer)
        }
        if (checkoutProbeTimer !== undefined) {
          window.clearTimeout(checkoutProbeTimer)
        }

        if (message) {
          setPaymentMessage(message)
        }

        setIsProcessingPayment(false)
        return true
      }

      const orderResult = await requestPaymentOrder(apiBaseUrl, bookingData.price)
      console.log('Razorpay create-order response', {
        status: orderResult.response.status,
        body: orderResult.payloadText,
      })

      if (!orderResult.response.ok || !orderResult.payload) {
        const serverMessage = parseApiErrorMessage(orderResult.payloadText)
        setPaymentMessage(`Unable to create payment order (${orderResult.response.status}): ${serverMessage}`)
        setIsProcessingPayment(false)
        return
      }

      const sdkLoaded = await loadRazorpayScript()
      if (!sdkLoaded) {
        setPaymentMessage('Unable to load Razorpay checkout SDK. Check your network and try again.')
        setIsProcessingPayment(false)
        return
      }

      const razorpay = createRazorpayInstance({
        keyId: razorpayKeyId,
        order: orderResult.payload,
        bookingData: {
          ...bookingData,
          customerName: name.trim(),
          mobileNumber,
        },
        customerName: name.trim(),
        mobileNumber,
        onDismiss: () => {
          cleanupStaleRazorpayUi()
          finishFlow('Payment cancelled.')
        },
        onSuccess: (response) => {
          if (!finishFlow()) {
            return
          }

          const completeBookingData: BookingData = {
            ...bookingData,
            selectedSlot,
            customerName: name.trim(),
            mobileNumber,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          }

          navigate('/success', { state: { bookingData: completeBookingData } })
        },
      })

      if (!razorpay) {
        setPaymentMessage('Razorpay is unavailable in this browser session.')
        setIsProcessingPayment(false)
        return
      }

      razorpay.on('payment.failed', (response: any) => {
        console.log('Razorpay payment.failed full response', response)
        console.log('Razorpay error.code', response?.error?.code)
        console.log('Razorpay error.description', response?.error?.description)
        console.log('Razorpay error.reason', response?.error?.reason)
        console.log('Razorpay error.source', response?.error?.source)
        console.log('Razorpay error.step', response?.error?.step)
        console.log('Razorpay error.metadata', response?.error?.metadata)
        const failureReason =
          response?.error?.description || response?.error?.reason || 'Payment failed or was cancelled.'
        cleanupStaleRazorpayUi()
        finishFlow(failureReason)
      })

      checkoutWatchdogTimer = window.setTimeout(() => {
        const checkoutContainer = document.querySelector('.razorpay-container')
        const checkoutFrame = document.querySelector('.razorpay-checkout-frame')

        if (!checkoutContainer && !checkoutFrame) {
          cleanupStaleRazorpayUi()
          finishFlow(
            'Checkout could not load. Disable ad blockers/VPN or try another network, then retry.',
          )
        }
      }, 12000)

      // If checkout UI appears, do not auto-cancel the flow.
      checkoutProbeTimer = window.setTimeout(() => {
        const checkoutContainer = document.querySelector('.razorpay-container')
        const checkoutFrame = document.querySelector('.razorpay-checkout-frame')
        if (checkoutContainer || checkoutFrame) {
          if (checkoutWatchdogTimer !== undefined) {
            window.clearTimeout(checkoutWatchdogTimer)
            checkoutWatchdogTimer = undefined
          }
        }
      }, 1200)

      try {
        razorpay.open()
      } catch (error) {
        console.error('Razorpay open() threw exception', error)
        cleanupStaleRazorpayUi()
        finishFlow('Unable to open checkout window. Please retry.')
        throw error
      }
    } catch (error) {
      console.error('Booking payment flow exception', error)
      if (error instanceof TypeError) {
        setPaymentMessage('Cannot reach payment server. Ensure backend is running and API URL is correct.')
      } else {
        setPaymentMessage('Unable to start payment. Check browser console and backend logs for details.')
      }
      setIsProcessingPayment(false)
    }
  }

  return {
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
    canSubmit,
    isProcessingPayment,
    paymentMessage,
    submit,
  }
}
