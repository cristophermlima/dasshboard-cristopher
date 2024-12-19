import { createContext } from 'react'
import { AppThemeContextProps } from '@/types'

// Define o contexto sem lógica adicional
export const AppThemeContext = createContext<AppThemeContextProps | undefined>(
  undefined
)
