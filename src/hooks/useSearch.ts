import { use, useEffect, useState, useTransition } from 'react'
import { useSearchParams } from 'react-router'
import { Cards, type Card } from 'scryfall-api'
import { RecentCardsContext } from '../contexts'
import { useZoomLevel } from './useZoomLevel'
import type { UseZoomLevelResult } from '../types/hooks'

type UseSearchResult = {
  cards: Card[]
  isLoading: boolean
  isLoadingMore: boolean
  totalCount: number
  hasMoreResults: boolean
  errorMessage: string | null
  onLoadMore: () => void
  setSearchParams: (params: URLSearchParams) => void
  query: string
  onClearSearch: () => void
} & UseZoomLevelResult

interface UseSearchParams {
  onClearSearchCallback?: () => void
}

export const useSearch = (options?: UseSearchParams): UseSearchResult => {
  const { onClearSearchCallback } = options || {}
  const [cards, setCards] = useState<Card[]>([])
  const [isLoading, startLoading] = useTransition()
  const [isLoadingMore, startLoadingMore] = useTransition()
  const [totalCount, setTotalCount] = useState<number>(0)
  const [hasMoreResults, setHasMoreResults] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const { addRecentlyViewedCard } = use(RecentCardsContext)
  const query = searchParams.get('q')?.trim() ?? ''
  const { zoomLevel, onResultsPerPageClick, isMaxZoom, isMinZoom } = useZoomLevel()

  const PAGE_SIZE = 175 // Default page size for card search results

  useEffect(() => {
    if (query === '') {
      // setCards([])
      return
    }

    startLoading(async () => {
      setErrorMessage(null)
      const result = Cards.search(query, 1)
      const fetchedCards = await result.next()
      setCards(fetchedCards)
      setTotalCount(result.count)
      setHasMoreResults(result.hasMore)

      if (!result.count) {
        setErrorMessage(`No results found for '${query}'. Try a different search term.`)
      }

      // If only one card is returned, add it to the search history
      if (fetchedCards.length === 1) {
        addRecentlyViewedCard(fetchedCards[0])
      }
    })
  }, [searchParams, addRecentlyViewedCard, query])

  const onLoadMore = () => {
    // Can also check using only the totalCount and cards length 🤷🏻‍♂️
    if (hasMoreResults) {
      if (!query) return

      setErrorMessage(null)

      startLoadingMore(async () => {
        const result = Cards.search(query, cards.length / PAGE_SIZE + 1)
        const moreCards = await result.next()
        setCards(prevCards => [...prevCards, ...moreCards])
        setHasMoreResults(result.hasMore)
      })
    }
  }

  const onClearSearch = () => {
    setCards([])
    setHasMoreResults(false)
    setTotalCount(0)
    setSearchParams(new URLSearchParams())
    if (onClearSearchCallback) onClearSearchCallback()
  }

  return {
    cards,
    isLoading,
    isLoadingMore,
    totalCount,
    hasMoreResults,
    errorMessage,
    onLoadMore,
    setSearchParams,
    query,
    zoomLevel,
    onResultsPerPageClick,
    isMaxZoom,
    isMinZoom,
    onClearSearch,
  }
}
