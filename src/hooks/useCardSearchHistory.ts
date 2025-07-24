import { useState } from 'react'
import type { Card } from 'scryfall-api'

type UseCardSearchHistoryResult = {
  recentlyViewedCards: Card[]
  addRecentlyViewedCard: (card: Card) => void
}

const useCardSearchHistory = (initialState: Card[] = []): UseCardSearchHistoryResult => {
  const [recentlyViewedCards, setSearchHistory] = useState<Card[]>(initialState)

  const addRecentlyViewedCard = (card: Card) => {
    setSearchHistory(prevHistory => {
      const updatedHistory = prevHistory.filter(c => c.id !== card.id)
      const newHistory = [card, ...updatedHistory].slice(0, 3) // Keep only the last 3 cards
      localStorage.setItem('cardSearchHistory', JSON.stringify(newHistory)) // Save to localStorage

      return newHistory
    })
  }

  return { recentlyViewedCards, addRecentlyViewedCard }
}

export { useCardSearchHistory }
