import { useState, useEffect, useTransition, useRef } from 'react'
import { Cards } from 'scryfall-api'
import { useDebounce } from './useDebounce'
import { useSearchParams } from 'react-router'

type CardSearchHandlers = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (suggestion?: string) => void
  onSuggestionClick: (suggestion: string) => void
  setIsInputFocused: (focused: boolean) => void
  onClearSearchCallback: () => void
  setIsRecentlyViewedFocused: (focused: boolean) => void
  onSearchKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  setIsSuggestionsFocused: (focused: boolean) => void
}

type CardSearchData = {
  cardName: string
  nameSuggestions: string[]
  query?: string
  searchInputRef?: React.RefObject<HTMLInputElement | null>
}

type CardSearchFlags = {
  isInputFocused: boolean
  isPendingSuggestions: boolean
  isRecentlyViewedFocused: boolean
  isSuggestionsFocused: boolean
}

type UseSearchFormResult = {
  data: CardSearchData
  flags: CardSearchFlags
  handlers: CardSearchHandlers
}

export const useSearchForm = (): UseSearchFormResult => {
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([])
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isRecentlyViewedFocused, setIsRecentlyViewedFocused] = useState(false)
  const [isSuggestionsFocused, setIsSuggestionsFocused] = useState(false)
  const [isPendingSuggestions, startTransitionSuggestions] = useTransition()
  const searchInputRef = useRef<HTMLInputElement>(null)
  const onClearSearchCallback = () => {
    setCardName('')
    setNameSuggestions([])
    setIsInputFocused(false)
  }
  const [cardName, setCardName] = useState('')
  const debouncedQuery = useDebounce(cardName, 250)
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

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

  const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      // If down key pressed focus on the next list item available
      const firstRecentlyViewedItem: Element | null =
        document.querySelectorAll('.recently-viewed-item')?.[0] ?? null
      if (firstRecentlyViewedItem instanceof HTMLElement) {
        firstRecentlyViewedItem.focus()
      }

      const firstSuggestionItem: Element | null =
        document.querySelectorAll('.suggestion-item')?.[0] ?? null
      if (firstSuggestionItem instanceof HTMLElement) {
        firstSuggestionItem.focus()
      }
    }
  }

  return {
    data: {
      cardName,
      nameSuggestions,
      searchInputRef,
      query,
    },
    flags: {
      isInputFocused,
      isPendingSuggestions,
      isRecentlyViewedFocused,
      isSuggestionsFocused,
    },
    handlers: {
      onSearchChange,
      onSearchSubmit,
      onSuggestionClick,
      setIsInputFocused,
      onClearSearchCallback,
      setIsRecentlyViewedFocused,
      onSearchKeyDown,
      setIsSuggestionsFocused,
    },
  }
}
