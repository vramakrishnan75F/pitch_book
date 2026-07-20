import type { CSSProperties } from 'react'
import { useTheme } from '../../theme/ThemeContext'

type TextInputProps = {
  id: string
  name: string
  type?: 'text' | 'date'
  value: string
  onChange: (nextValue: string) => void
  onBlur?: () => void
  inputMode?: 'text' | 'numeric'
  maxLength?: number
  placeholder?: string
  className?: string
  style?: CSSProperties
}

function TextInput({
  id,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  inputMode,
  maxLength,
  placeholder,
  className,
  style,
}: TextInputProps) {
  const { theme } = useTheme()

  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      inputMode={inputMode}
      maxLength={maxLength}
      placeholder={placeholder}
      className={className}
      style={{
        width: '100%',
        padding: `${theme.spacing.md} ${theme.spacing.md}`,
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colors.border.default}`,
        boxSizing: 'border-box',
        ...style,
      }}
    />
  )
}

export default TextInput
