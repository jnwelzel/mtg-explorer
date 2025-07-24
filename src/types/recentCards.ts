import type { Card } from 'scryfall-api'

export type RecentCardsContextType = {
  recentlyViewedCards: Card[]
  addRecentlyViewedCard: (card: Card) => void
}
