import type { ReactNode } from 'react'
import Footer from '../components/ui/Footer'
import Header from '../components/ui/Header'
import Text from '../components/ui/Text'
import { useTheme } from '../theme/ThemeContext'

type AppLayoutProps = {
  title?: string
  children: ReactNode
  fullBleed?: boolean
  showHeader?: boolean
  showFooter?: boolean
}

function AppLayout({
  title = 'GoArena',
  children,
  fullBleed = false,
  showHeader = true,
  showFooter = true,
}: AppLayoutProps) {
  const { theme } = useTheme()

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.colors.surface.primary,
        color: theme.colors.text.primary,
      }}
    >
      <div
        style={{
          maxWidth: fullBleed ? '100%' : theme.spacing.pageMaxWidth,
          margin: '0 auto',
          padding: fullBleed ? '0' : theme.spacing.xxl,
        }}
      >
        {showHeader ? <Header title={<Text as="h1" variant="headline">{title}</Text>} /> : null}
        <div style={{ overflowX: 'hidden' }}>{children}</div>
        {showFooter ? (
          <Footer>
            <Text variant="caption" color={theme.colors.text.secondary}>
              GoArena
            </Text>
          </Footer>
        ) : null}
      </div>
    </div>
  )
}

export default AppLayout
