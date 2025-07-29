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

export type ZoomLevel = '0' | '0.25' | '0.5' | '0.75' | '1' | '1.25' | '1.5' | '1.75' | '2'

export type ZoomTypes = 'zoomIn' | 'zoomOut'
