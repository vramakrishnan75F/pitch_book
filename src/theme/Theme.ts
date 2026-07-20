import { animation } from '../design/animation'
import { breakpoints, containerWidths } from '../design/breakpoints'
import { colors } from '../design/colors'
import { radius } from '../design/radius'
import { shadows } from '../design/shadows'
import { spacing } from '../design/spacing'
import { typography } from '../design/typography'

export type AppTheme = {
  name: string
  mode: 'light' | 'dark'
  colors: typeof colors
  typography: typeof typography
  spacing: typeof spacing
  radius: typeof radius
  shadows: typeof shadows
  breakpoints: typeof breakpoints
  containerWidths: typeof containerWidths
  animations: typeof animation
}

export const lightTheme: AppTheme = {
  name: 'goarena-light',
  mode: 'light',
  colors,
  typography,
  spacing,
  radius,
  shadows,
  breakpoints,
  containerWidths,
  animations: animation,
}

export const darkThemePlaceholder: AppTheme = {
  ...lightTheme,
  name: 'goarena-dark-placeholder',
  mode: 'dark',
}

export const eventThemePlaceholder: AppTheme = {
  ...lightTheme,
  name: 'goarena-event-placeholder',
}
