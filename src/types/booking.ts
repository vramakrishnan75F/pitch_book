export interface BaseBookingData {
  pitchName: string
  location: string
  sport: string
  price: number
  selectedSlot: string
}

export interface BookingData extends BaseBookingData {
  customerName: string
  mobileNumber: string
  paymentId?: string
  orderId?: string
}

export type BookingState = {
  bookingData?: BaseBookingData
}

export type SuccessState = {
  bookingData?: BookingData
}
