import type { Currency } from './currency'

export type CardBadges = 'Reprint' | 'Reserved'

export type UseMagicCardResult = {
  currency: Currency
  images: string[]
  isDoubleFaced: boolean
  faceIndex: number
  handleImageClick: () => void
  badges: CardBadges[]
  cardName: string
  faces: string[]
}
