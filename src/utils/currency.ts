import type { Prices } from 'scryfall-api'
import type { Currency } from '../types'
import type { FoilCurrencies } from '../types/currency'

export const getCurrencySymbol = (currency: string): string => {
  switch (currency) {
    case 'usd':
      return '$'
    case 'eur':
      return '€'
    case 'tix':
      return 'Tix '
    case 'eur_foil':
      return '€'
    case 'usd_foil':
      return '$'
    default:
      return currency.toUpperCase() // Fallback to uppercase currency code
  }
}

export const getCardPrice = (prices: Prices, currency: keyof Prices): string => {
  const price = prices[currency]
  if (price === undefined || price === null) {
    return ''
  }
  return `${getCurrencySymbol(currency)}${parseFloat(price).toFixed(2)}`
}

export const getFoilForCurrency = (currency: Currency): FoilCurrencies => {
  switch (currency) {
    case 'usd':
      return 'usd_foil'
    case 'eur':
      return 'eur_foil'
    default:
      return 'eur_foil' // Default to EUR foil if not specified
  }
}
