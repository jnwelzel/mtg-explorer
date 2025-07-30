import { useState, useTransition } from 'react'
import { Cards, type Card } from 'scryfall-api'

type UseCardSearchResult = {
  isLoadingMore: boolean
  isLoading: boolean
  hasMoreResults: boolean
  searchCards: () => void
  cards: Card[]
}

const PAGE_SIZE = 175 // Default page size for card search results

export const useCardSearch = (query: string): UseCardSearchResult => {
  const [isLoading, startLoading] = useTransition()
  const [isLoadingMore, startLoadingMore] = useTransition()
  const [hasMoreResults, setHasMoreResults] = useState(false)
  const [cards, setCards] = useState<Card[]>([])

  const searchCards = () => {
    if (hasMoreResults) {
      startLoadingMore(async () => {
        const result = Cards.search(query, Math.floor(cards.length / PAGE_SIZE) + 1)
        const moreCards = await result.next()
        setCards(prevCards => [...prevCards, ...moreCards])
        setHasMoreResults(result.hasMore)
      })
    } else {
      startLoading(async () => {
        const result = Cards.search(query, 1)
        const initialCards = await result.next()
        setCards(initialCards)
        setHasMoreResults(result.hasMore)
      })
    }
  }

  return { isLoading, isLoadingMore, hasMoreResults, searchCards, cards }
}
