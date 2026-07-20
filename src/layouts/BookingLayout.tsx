import type { ReactNode } from 'react'
import AppLayout from './AppLayout'

type BookingLayoutProps = {
  children: ReactNode
}

function BookingLayout({ children }: BookingLayoutProps) {
  return (
    <AppLayout title="GoArena" fullBleed showHeader={false} showFooter={false}>
      {children}
    </AppLayout>
  )
}

export default BookingLayout
