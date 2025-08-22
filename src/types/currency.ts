import type { Prices } from 'scryfall-api'

export type Currency = 'usd' | 'eur' | 'tix'

export type CurrencyContextType = {
  currency: Currency
  setCurrency: (currency: Currency) => void
}

export type FoilCurrencies = Extract<keyof Prices, 'usd_foil' | 'eur_foil'>
