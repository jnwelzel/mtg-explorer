export type Currency = 'usd' | 'eur' | 'tix'

export type CurrencyContextType = {
  currency: Currency
  setCurrency: (currency: Currency) => void
}
