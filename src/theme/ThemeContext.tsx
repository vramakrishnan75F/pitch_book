import { createContext, useContext } from 'react'
import type { AppTheme } from './Theme'
import { lightTheme } from './Theme'

type ThemeContextValue = {
  theme: AppTheme
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
})

export function useTheme() {
  return useContext(ThemeContext)
}
