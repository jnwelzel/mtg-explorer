import type { Prices } from 'scryfall-api'

export const getCurrencySymbol = (currency: string): string => {
  switch (currency) {
    case 'usd':
      return '$'
    case 'eur':
      return '€'
    case 'tix':
      return 'Tix '
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
