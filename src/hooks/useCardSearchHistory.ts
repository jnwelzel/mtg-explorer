import { useState } from 'react'
import type { Card } from 'scryfall-api'

export type UseCardSearchHistoryResult = {
  searchHistory: Card[]
  addCardToHistory: (card: Card) => void
}

const useCardSearchHistory = (initialState: Card[] = []): UseCardSearchHistoryResult => {
  const [searchHistory, setSearchHistory] = useState<Card[]>(initialState)

  const addCardToHistory = (card: Card) => {
    setSearchHistory(prevHistory => {
      const updatedHistory = prevHistory.filter(c => c.id !== card.id)
      const newHistory = [card, ...updatedHistory].slice(0, 3) // Keep only the last 3 cards
      localStorage.setItem('cardSearchHistory', JSON.stringify(newHistory)) // Save to localStorage

      return newHistory
    })
  }

  return { searchHistory, addCardToHistory }
}

export { useCardSearchHistory }
