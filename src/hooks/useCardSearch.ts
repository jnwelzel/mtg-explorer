import { useState, useEffect, useTransition } from 'react'
import { Cards, type Card } from 'scryfall-api'
import { useDebounce } from './useDebounce'
import { useCardSearchHistory } from './useCardSearchHistory'

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

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(event.target.value)
    setErrorMessage(null)
    if (event.target.value.trim() === '') {
      setCards([])
      setNameSuggestions([])
    }
  }

  const onSearchSubmit = (suggestion?: string) => {
    setNameSuggestions([])
    setErrorMessage(null)

    startTransition(async () => {
      if (suggestion) {
        // If a suggestion is provided, set the card name to that suggestion
        setCardName(suggestion)
        const card = await Cards.byName(suggestion)

        if (card) {
          addCardToHistory(card)
          setCards([card])
        }
      } else {
        const result = Cards.search(cardName)
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
      }
    })
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
    setCardName(suggestion)
    setNameSuggestions([])
    onSearchSubmit(suggestion)
  }

  const onClearSearch = () => {
    setCards([])
    setCardName('')
    setNameSuggestions([])
    setIsInputFocused(false)
  }

  return {
    data: {
      cards,
      cardName,
      errorMessage,
      nameSuggestions,
      searchHistory,
      totalCount,
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
