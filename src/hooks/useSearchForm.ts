import { useState, useEffect, useTransition, useRef } from 'react'
import { Cards, type Card } from 'scryfall-api'
import { useDebounce } from './useDebounce'
import { useSearch } from './useSearch'
import type { ZoomLevel, ZoomTypes } from '../types'

type CardSearchHandlers = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (suggestion?: string) => void
  onSuggestionClick: (suggestion: string) => void
  onClearSearch: () => void
  onLoadMore: () => void
  setIsInputFocused: (focused: boolean) => void
  onZoomClick: (type: ZoomTypes) => void
}

type CardSearchData = {
  cards: Card[]
  cardName: string
  nameSuggestions: string[]
  totalCount: number
  errorMessage?: string | null
  query?: string
  searchInputRef?: React.RefObject<HTMLInputElement | null>
  zoomLevel: ZoomLevel
}

type CardSearchFlags = {
  isInputFocused: boolean
  isPending: boolean
  isPendingSuggestions: boolean
  hasMoreResults?: boolean
  isLoadingMore?: boolean
  isMaxZoom: boolean
  isMinZoom: boolean
}

type UseSearchFormResult = {
  data: CardSearchData
  flags: CardSearchFlags
  handlers: CardSearchHandlers
}

export const useSearchForm = (): UseSearchFormResult => {
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isPendingSuggestions, startTransitionSuggestions] = useTransition()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const onClearSearchCallback = () => {
    setCardName('')
    setNameSuggestions([])
    setIsInputFocused(false)
  }
  const {
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
  } = useSearch({ onClearSearchCallback })
  const [cardName, setCardName] = useState('')
  const debouncedQuery = useDebounce(cardName, 250)

  useEffect(() => {
    if (debouncedQuery) {
      if (debouncedQuery.trim() === '') {
        return
      }
      const fetchSuggestions = () => {
        startTransitionSuggestions(async () => {
          const suggestions = await Cards.autoCompleteName(debouncedQuery)
          if (suggestions.length > 0 && suggestions[0] !== debouncedQuery) {
            setNameSuggestions(suggestions)
          } else {
            setNameSuggestions([])
          }
        })
      }
      fetchSuggestions()
    }
  }, [debouncedQuery, startTransitionSuggestions])

  useEffect(() => {
    setCardName(query)
  }, [query])

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(event.target.value)
    if (event.target.value.trim() === '') {
      setNameSuggestions([])
      setIsInputFocused(true)
    }
  }

  const onSearchSubmit = () => {
    searchInputRef.current?.blur()
    if (cardName.trim()) {
      setSearchParams(new URLSearchParams({ q: cardName }))
    }
  }

  const onSuggestionClick = (suggestion: string): void => {
    setSearchParams(new URLSearchParams({ q: suggestion }))
  }

  return {
    data: {
      cards,
      cardName,
      errorMessage,
      nameSuggestions,
      totalCount,
      searchInputRef,
      query,
      zoomLevel,
    },
    flags: {
      isInputFocused,
      isPending: isLoading,
      isPendingSuggestions,
      hasMoreResults,
      isLoadingMore,
      isMaxZoom,
      isMinZoom,
    },
    handlers: {
      onSearchChange,
      onSearchSubmit,
      onSuggestionClick,
      setIsInputFocused,
      onClearSearch,
      onLoadMore,
      onZoomClick: onResultsPerPageClick,
    },
  }
}
