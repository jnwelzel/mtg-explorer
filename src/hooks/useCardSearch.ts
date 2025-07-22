import { useState, useEffect, useTransition } from 'react'
import { Cards, type Card } from 'scryfall-api'
import { useDebounce } from './useDebounce'
import { useCardSearchHistory } from './useCardSearchHistory'
import { useSearchParams } from 'react-router'

type CardSearchHandlers = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (suggestion?: string) => void
  onSuggestionClick: (suggestion: string) => void
  onClearSearch: () => void
  onLoadMore: () => void
  setIsInputFocused: (focused: boolean) => void
}

type CardSearchData = {
  cards: Card[]
  cardName: string
  nameSuggestions: string[]
  searchHistory: Card[]
  totalCount: number
  errorMessage?: string | null
  query?: string
}

type CardSearchFlags = {
  isInputFocused: boolean
  isPending: boolean
  isPendingSuggestions: boolean
  hasMoreResults?: boolean
  isLoadingMore?: boolean
}

type UseCardSearchResult = {
  data: CardSearchData
  flags: CardSearchFlags
  handlers: CardSearchHandlers
}

const PAGE_SIZE = 175 // Number of cards per page

const useCardSearch = (): UseCardSearchResult => {
  let [searchParams, setSearchParams] = useSearchParams()
  const [cards, setCards] = useState<Card[]>([])
  const [cardName, setCardName] = useState('')
  const debouncedQuery = useDebounce(cardName, 250)
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([])
  const { searchHistory, addCardToHistory } = useCardSearchHistory(
    localStorage.getItem('cardSearchHistory')
      ? JSON.parse(localStorage.getItem('cardSearchHistory')!)
      : []
  )
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isPendingSuggestions, startTransitionSuggestions] = useTransition()
  const [isLoadingMore, startTransitionLoadingMore] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasMoreResults, setHasMoreResults] = useState(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  let query = searchParams.get('q')?.trim() ?? ''

  useEffect(() => {
    if (debouncedQuery) {
      if (debouncedQuery.trim() === '') {
        setCards([])
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
  }, [debouncedQuery])

  useEffect(() => {
    if (query) {
      setNameSuggestions([])
      setCardName(query)
      startTransition(async () => {
        const result = Cards.search(query)
        const cards = await result.next()
        setTotalCount(result.count)
        setHasMoreResults(result.hasMore)
        if (!result.count) {
          setCards([])
          setErrorMessage(`No results found for '${cardName}'. Try a different search term.`)
          return
        }

        // Add the cards to the state
        setCards(cards)

        // If only one card is returned, add it to the search history
        if (cards.length === 1) {
          addCardToHistory(cards[0])
        }
      })
    } else {
      setCards([])
      setCardName('')
      setTotalCount(0)
      setHasMoreResults(false)
      setErrorMessage(null)
    }
  }, [query])

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(event.target.value)
    setErrorMessage(null)
    if (event.target.value.trim() === '') {
      setNameSuggestions([])
      setHasMoreResults(false)
      setIsInputFocused(true)
    }
  }

  const onSearchSubmit = () => {
    setSearchParams({ q: cardName })
  }

  const onLoadMore = () => {
    if (hasMoreResults) {
      startTransitionLoadingMore(async () => {
        const result = Cards.search(cardName, cards.length / PAGE_SIZE + 1)
        const moreCards = await result.next()
        setCards(prevCards => [...prevCards, ...moreCards])
        setHasMoreResults(result.hasMore)
      })
    }
  }

  const onSuggestionClick = (suggestion: string): void => {
    setSearchParams({ q: suggestion })
  }

  const onClearSearch = () => {
    setCards([])
    setCardName('')
    setNameSuggestions([])
    setIsInputFocused(false)
    setHasMoreResults(false)
    setTotalCount(0)
    setSearchParams({})
  }

  return {
    data: {
      cards,
      cardName,
      errorMessage,
      nameSuggestions,
      searchHistory,
      totalCount,
      query,
    },
    flags: {
      isInputFocused,
      isPending,
      isPendingSuggestions,
      hasMoreResults,
      isLoadingMore,
    },
    handlers: {
      onSearchChange,
      onSearchSubmit,
      onSuggestionClick,
      setIsInputFocused,
      onClearSearch,
      onLoadMore,
    },
  }
}

export { useCardSearch }
