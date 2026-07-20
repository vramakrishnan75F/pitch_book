import type { LabelHTMLAttributes } from 'react'
import { useTheme } from '../../theme/ThemeContext'
import Text from './Text'

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

function Label({ children, ...props }: LabelProps) {
  const { theme } = useTheme()

  return (
    <label {...props} style={{ display: 'block', marginBottom: theme.spacing.xs }}>
      <Text as="span" variant="label">{children}</Text>
    </label>
  )
}

export default Label
