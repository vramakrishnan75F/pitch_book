import type { ReactNode } from 'react'
import { ThemeContext } from './ThemeContext'
import { lightTheme, type AppTheme } from './Theme'

type ThemeProviderProps = {
  children: ReactNode
  theme?: AppTheme
}

function ThemeProvider({ children, theme = lightTheme }: ThemeProviderProps) {
  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}

export default ThemeProvider
