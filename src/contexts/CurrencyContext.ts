import { createContext } from 'react'

export type Currency = 'usd' | 'eur' | 'tix'

export type CurrencyContextType = {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

export const CurrencyContext = createContext<CurrencyContextType>({} as CurrencyContextType)
