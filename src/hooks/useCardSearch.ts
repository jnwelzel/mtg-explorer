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
}

const useCardSearch = (): UseCardSearchResult => {
  const [cards, setCards] = useState<Card[]>([])
  const [cardName, setCardName] = useState('')
  const debouncedQuery = useDebounce(cardName, 400)
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([])
  const { searchHistory, addCardToHistory } = useCardSearchHistory(
    localStorage.getItem('cardSearchHistory')
      ? JSON.parse(localStorage.getItem('cardSearchHistory')!)
      : []
  )
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (debouncedQuery) {
      if (debouncedQuery.trim() === '') {
        setCards([])
        return
      }
      const fetchSuggestions = async () => {
        const suggestions = await Cards.autoCompleteName(debouncedQuery)
        if (suggestions.length > 0 && suggestions[0] !== debouncedQuery) {
          setNameSuggestions(suggestions)
        } else {
          setNameSuggestions([])
        }
      }
      fetchSuggestions()
    }
  }, [debouncedQuery])

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(event.target.value)
    if (event.target.value.trim() === '') {
      setCards([])
      setNameSuggestions([])
    }
  }

  const handleSearchSubmit = async (suggestion?: string) => {
    startTransition(async () => {
      const cards = await Cards.search(suggestion || cardName).all()
      if (!cards || cards.length === 0) {
        setCards([])
        return
      }
      // If a suggestion is provided, set the card name to that suggestion
      if (suggestion) {
        setCardName(suggestion)
        addCardToHistory(cards[0])
      }
      // Clear suggestions if a card is found
      setNameSuggestions([])
      // Set the found card
      setCards(cards)
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
  }
}

export { useCardSearch }
