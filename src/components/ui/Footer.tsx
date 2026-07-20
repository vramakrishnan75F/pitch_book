import type { ReactNode } from 'react'
import { useTheme } from '../../theme/ThemeContext'

type FooterProps = {
  children?: ReactNode
}

function Footer({ children }: FooterProps) {
  const { theme } = useTheme()
  return (
    <footer
      style={{
        marginTop: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
        borderTop: `1px solid ${theme.colors.border.default}`,
      }}
    >
      {children}
    </footer>
  )
}

export default Footer
