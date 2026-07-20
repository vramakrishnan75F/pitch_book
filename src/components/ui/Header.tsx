import type { ReactNode } from 'react'
import { useTheme } from '../../theme/ThemeContext'

type HeaderProps = {
  title?: ReactNode
  actions?: ReactNode
}

function Header({ title, actions }: HeaderProps) {
  const { theme } = useTheme()
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: theme.spacing.xl,
      }}
    >
      <div>{title}</div>
      <div>{actions}</div>
    </header>
  )
}

export default Header
