import type { CSSProperties, ReactNode } from 'react'
import { useTheme } from '../../theme/ThemeContext'

type TextVariant =
  | 'display'
  | 'headline'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'caption'
  | 'button'

type TextProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'label' | 'strong'
  variant?: TextVariant
  className?: string
  unstyled?: boolean
  weight?: number
  align?: CSSProperties['textAlign']
  color?: string
  truncate?: boolean
  lineClamp?: number
  style?: CSSProperties
  children: ReactNode
}

const variantStyles: Record<TextVariant, CSSProperties> = {
  display: { fontSize: '2.2rem', lineHeight: 1.15, fontWeight: 600 },
  headline: { fontSize: '1.8rem', lineHeight: 1.2, fontWeight: 600 },
  title: { fontSize: '1.4rem', lineHeight: 1.25, fontWeight: 600 },
  subtitle: { fontSize: '1.1rem', lineHeight: 1.35, fontWeight: 500 },
  body: { fontSize: '1rem', lineHeight: 1.45, fontWeight: 400 },
  bodySmall: { fontSize: '0.9rem', lineHeight: 1.4, fontWeight: 400 },
  label: { fontSize: '0.95rem', lineHeight: 1.35, fontWeight: 500 },
  caption: { fontSize: '0.8rem', lineHeight: 1.3, fontWeight: 400 },
  button: { fontSize: '0.95rem', lineHeight: 1.2, fontWeight: 600 },
}

function Text({
  as = 'p',
  variant = 'body',
  className,
  unstyled = false,
  weight,
  align,
  color,
  truncate = false,
  lineClamp,
  style,
  children,
}: TextProps) {
  const { theme } = useTheme()
  const Component = as

  const clampStyles: CSSProperties =
    typeof lineClamp === 'number'
      ? {
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: lineClamp,
          WebkitBoxOrient: 'vertical',
        }
      : {}

  return (
    <Component
      className={className}
      style={{
        margin: 0,
        ...(unstyled
          ? {}
          : {
              fontFamily: theme.typography.fontFamily.body,
              color: color ?? theme.colors.text.primary,
              textAlign: align,
              fontWeight: weight ?? variantStyles[variant].fontWeight,
              ...variantStyles[variant],
              ...(truncate
                ? { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }
                : {}),
              ...clampStyles,
            }),
        ...style,
      }}
    >
      {children}
    </Component>
  )
}

export default Text
