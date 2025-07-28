import { useState, useEffect, useTransition, use, useRef } from 'react'
import { Cards, type Card } from 'scryfall-api'
import { useDebounce } from './useDebounce'
import { useSearchParams } from 'react-router'
import { RecentCardsContext } from '../contexts'
import { useLocalStorage, useWindowSize } from '@uidotdev/usehooks'

type ZoomTypes = 'zoomIn' | 'zoomOut'

type CardSearchHandlers = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSearchSubmit: (suggestion?: string) => void
  onSuggestionClick: (suggestion: string) => void
  onClearSearch: () => void
  onLoadMore: () => void
  setIsInputFocused: (focused: boolean) => void
  onResultsPerPageClick: (type: ZoomTypes) => void
}

type CardSearchData = {
  cards: Card[]
  cardName: string
  nameSuggestions: string[]
  totalCount: number
  errorMessage?: string | null
  query?: string
  searchInputRef?: React.RefObject<HTMLInputElement | null>
  zoomLevel: number
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

type UseCardSearchResult = {
  data: CardSearchData
  flags: CardSearchFlags
  handlers: CardSearchHandlers
}

const PAGE_SIZE = 175 // Number of cards per page
const MAX_ZOOM_LEVEL = 2 // Limit zoom level to a maximum of 2
const MIN_ZOOM_LEVEL = 0 // Limit zoom level to a minimum of 0
const ZOOM_STEP = 0.25 // Step size for zooming in and out
const MEDIUM_SCREEN_WIDTH = 768 // Width at which zoom level is considered minimum
const LARGE_SCREEN_WIDTH = 1024 // Width at which zoom level is considered minimum

const useCardSearch = (): UseCardSearchResult => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cards, setCards] = useState<Card[]>([])
  const [cardName, setCardName] = useState('')
  const debouncedQuery = useDebounce(cardName, 250)
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([])
  const { addRecentlyViewedCard } = use(RecentCardsContext)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isPendingSuggestions, startTransitionSuggestions] = useTransition()
  const [isLoadingMore, startTransitionLoadingMore] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [hasMoreResults, setHasMoreResults] = useState(false)
  const [totalCount, setTotalCount] = useState<number>(0)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [zoomLevel, setZoomLevel] = useLocalStorage<number>('zoomLevel', 1)
  const query = searchParams.get('q')?.trim() ?? ''
  const { width } = useWindowSize()

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
          addRecentlyViewedCard(cards[0])
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
    searchInputRef.current?.blur()
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

  // Function to handle zoom in and zoom out
  const onResultsPerPageClick = (type: 'zoomIn' | 'zoomOut') => {
    // We can go any one way 5x
    if (type === 'zoomIn') {
      setZoomLevel(prev => Math.min(prev + ZOOM_STEP, MAX_ZOOM_LEVEL))
    } else {
      setZoomLevel(prev => Math.max(prev - ZOOM_STEP, MIN_ZOOM_LEVEL))
    }
  }

  const isMaxedOutInSmallScreen = (width ?? 0) < MEDIUM_SCREEN_WIDTH && zoomLevel === 1
  const isMaxedOutInMediumScreen =
    (width ?? 0) > MEDIUM_SCREEN_WIDTH && (width ?? 0) < LARGE_SCREEN_WIDTH && zoomLevel === 1.75

  return {
    data: {
      cards,
      cardName,
      errorMessage,
      nameSuggestions,
      totalCount,
      query,
      searchInputRef,
      zoomLevel,
    },
    flags: {
      isInputFocused,
      isPending,
      isPendingSuggestions,
      hasMoreResults,
      isLoadingMore,
      isMaxZoom: zoomLevel >= MAX_ZOOM_LEVEL || isMaxedOutInSmallScreen || isMaxedOutInMediumScreen,
      isMinZoom: zoomLevel <= MIN_ZOOM_LEVEL,
    },
    handlers: {
      onSearchChange,
      onSearchSubmit,
      onSuggestionClick,
      setIsInputFocused,
      onClearSearch,
      onLoadMore,
      onResultsPerPageClick,
    },
  }
}

export { useCardSearch }
