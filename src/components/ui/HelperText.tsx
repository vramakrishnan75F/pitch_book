import Text from './Text'
import { useTheme } from '../../theme/ThemeContext'

type HelperTextProps = {
  message: string
}

function HelperText({ message }: HelperTextProps) {
  const { theme } = useTheme()
  return <Text variant="caption" color={theme.colors.text.secondary}>{message}</Text>
}

export default HelperText
