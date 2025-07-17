import type { Currency } from './currency'

export type UseMagicCardResult = {
  currency: Currency
  imageUrl: string | undefined
  isDoubleFaced: boolean
  faceIndex: number
  handleImageClick: () => void
}
