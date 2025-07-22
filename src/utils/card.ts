import type { Card } from 'scryfall-api'

export const isDoubleSided = (card: Card) =>
  !!(card.card_faces && card.card_faces.length > 1 && !card?.image_uris?.large)

export const isDoubleFaced = (card: Card) =>
  !!(card.card_faces && card.card_faces.length > 1 && card?.image_uris?.large)
