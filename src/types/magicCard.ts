import type { Currency } from './currency'

export type CardBadges = 'Reprint' | 'Reserved'

export type CardFace = {
  name: string
  type: string
  text: string
}

export type UseMagicCardResult = {
  currency: Currency
  images: string[]
  isDoubleSided: boolean
  faceIndex: number
  handleImageClick: () => void
  badges: CardBadges[]
  cardName: string
  faces: string[]
}
