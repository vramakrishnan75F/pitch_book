import { useTheme } from '../../theme/ThemeContext'
import Text from './Text'

type FieldErrorProps = {
  message: string
}

function FieldError({ message }: FieldErrorProps) {
  const { theme } = useTheme()

  return (
    <Text
      variant="bodySmall"
      color={theme.colors.text.danger}
      style={{ marginTop: theme.spacing.xs }}
      as="p"
    >
      {message}
    </Text>
  )
}

export default FieldError
