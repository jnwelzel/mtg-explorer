import { createContext } from 'react'
import type { CurrencyContextType } from '../types'

export const CurrencyContext = createContext<CurrencyContextType>({} as CurrencyContextType)
