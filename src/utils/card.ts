import type { Card } from 'scryfall-api'
import type { ColorRecord } from '../types/search'

export const isDoubleSided = (card: Card) =>
  !!(card.card_faces && card.card_faces.length > 1 && !card?.image_uris?.large)

export const isDoubleFaced = (card: Card) =>
  !!(card.card_faces && card.card_faces.length > 1 && card?.image_uris?.large)

export const COLORS: ColorRecord = {
  w: 'White',
  u: 'Blue',
  b: 'Black',
  r: 'Red',
  g: 'Green',
  c: 'Colorless',
}

export const getMarketProviderLabel = (seller: string) => {
  switch (seller) {
    case 'tcgplayer':
      return 'TCGPlayer'
    case 'cardmarket':
      return 'Cardmarket'
    case 'cardhoarder':
      return 'Cardhoarder'
    default:
      return seller
  }
}
