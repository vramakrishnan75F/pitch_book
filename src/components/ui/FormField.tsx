import type { ReactNode } from 'react'
import { useTheme } from '../../theme/ThemeContext'

type FormFieldProps = {
  children: ReactNode
}

function FormField({ children }: FormFieldProps) {
  const { theme } = useTheme()
  return <div style={{ marginBottom: theme.spacing.xl }}>{children}</div>
}

export default FormField
