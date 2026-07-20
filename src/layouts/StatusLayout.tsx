import type { ReactNode } from 'react'
import AppLayout from './AppLayout'

type StatusLayoutProps = {
  children: ReactNode
}

function StatusLayout({ children }: StatusLayoutProps) {
  return <AppLayout fullBleed showHeader={false} showFooter={false}>{children}</AppLayout>
}

export default StatusLayout
