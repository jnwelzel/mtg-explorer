import type { Currency } from './currency'

export type CardBadge = 'Reprint' | 'Reserved'

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
  handleButtonClick: () => void
  badges: CardBadge[]
  cardName: string
  faces: string[]
  imageLink: string
}
