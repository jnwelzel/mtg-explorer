import { useState, useEffect, useTransition } from 'react'
import { Cards, type Card } from 'scryfall-api'
import { useDebounce } from './useDebounce'
import { useCardSearchHistory } from './useCardSearchHistory'

export type UseCardSearchResult = {
  cards: Card[]
  cardName: string
  nameSuggestions: string[]
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSearchSubmit: (suggestion?: string) => Promise<void>
  handleSuggestionClick: (suggestion: string) => void
  searchHistory: Card[]
  isInputFocused: boolean
  setIsInputFocused: (focused: boolean) => void
  isPending: boolean
  handleClearSearch: () => void
  errorMessage?: string | null
  isPendingSuggestions: boolean
}

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(event.target.value)
    setErrorMessage(null)
    if (event.target.value.trim() === '') {
      setCards([])
      setNameSuggestions([])
    }
  }

  const handleSearchSubmit = async (suggestion?: string) => {
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
        const cards = await Cards.search(cardName).all()
        if (!cards || cards.length === 0) {
          setCards([])
          setErrorMessage(`No results found for '${cardName}'. Try a different search term.`)
          return
        }

        // Add the cards to the state
        setCards(cards)
      }
    })
  }

  const handleSuggestionClick = (suggestion: string): void => {
    setCardName(suggestion)
    setNameSuggestions([])
    handleSearchSubmit(suggestion)
  }

  const handleClearSearch = () => {
    setCards([])
    setCardName('')
    setNameSuggestions([])
    setIsInputFocused(false)
  }

  return {
    cards,
    cardName,
    nameSuggestions,
    handleSearchChange,
    handleSearchSubmit,
    handleSuggestionClick,
    searchHistory,
    isInputFocused,
    setIsInputFocused,
    isPending,
    handleClearSearch,
    errorMessage,
    isPendingSuggestions,
  }
}

export { useCardSearch }
