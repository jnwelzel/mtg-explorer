import { useEffect, useState } from 'react'
import type { Currency } from '../types'
import type { Card } from 'scryfall-api'
import { useCardSearchHistory } from './useCardSearchHistory'

export type UseAppResult = {
  isMenuOpen: boolean
  setMenuOpen: (isOpen: boolean) => void
  currency: Currency
  setCurrency: (currency: Currency) => void
  recentlyViewedCards: Card[]
  addRecentlyViewedCard: (card: Card) => void
}

const useApp = (): UseAppResult => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [currency, setCurrency] = useState<Currency>('eur')
  const { recentlyViewedCards, addRecentlyViewedCard } = useCardSearchHistory(
    localStorage.getItem('cardSearchHistory')
      ? JSON.parse(localStorage.getItem('cardSearchHistory')!)
      : []
  )

  useEffect(() => {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'eur')
    } else {
      localStorage.setItem('currency', currency)
    }

    const savedCurrency = localStorage.getItem('currency')
    setCurrency((savedCurrency as Currency) || 'eur')
  }, [currency])

  return {
    isMenuOpen,
    setMenuOpen,
    currency,
    setCurrency,
    recentlyViewedCards,
    addRecentlyViewedCard,
  }
}

export { useApp }
