import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { useTheme } from '../../theme/ThemeContext'

type ButtonVariant = 'primary' | 'slot' | 'unstyled'

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  children: ReactNode
  selected?: boolean
  variant?: ButtonVariant
  style?: CSSProperties
}

function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  selected = false,
  variant = 'primary',
  className,
  style,
  ...props
}: ButtonProps) {
  const { theme } = useTheme()
  const isSlot = variant === 'slot'
  const isUnstyled = variant === 'unstyled'

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        width: isUnstyled ? undefined : isSlot ? '100%' : undefined,
        textAlign: isUnstyled ? undefined : isSlot ? 'left' : 'center',
        padding: isUnstyled
          ? undefined
          : isSlot
            ? `${theme.spacing.md} ${theme.spacing.lg}`
            : `${theme.spacing.lg} ${theme.spacing.xl}`,
        borderRadius: isUnstyled ? undefined : theme.radius.md,
        border: isUnstyled
          ? undefined
          : isSlot
            ? selected
              ? `2px solid ${theme.colors.border.selected}`
              : `1px solid ${theme.colors.border.default}`
            : `1px solid ${theme.colors.border.strong}`,
        backgroundColor: isUnstyled
          ? undefined
          : isSlot
            ? selected
              ? theme.colors.surface.selected
              : theme.colors.surface.primary
            : disabled
              ? theme.colors.state.disabled
              : theme.colors.brand.primary,
        color: isUnstyled ? undefined : isSlot ? theme.colors.text.primary : theme.colors.text.inverse,
        fontWeight: isUnstyled
          ? undefined
          : isSlot
            ? theme.typography.fontWeight.regular
            : theme.typography.fontWeight.semibold,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: isUnstyled
          ? undefined
          : `transform ${theme.animations.duration.fast} ${theme.animations.easing.standard}`,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
