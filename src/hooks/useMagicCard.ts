import { useContext, useState } from 'react'
import type { Card } from 'scryfall-api'
import { CurrencyContext } from '../contexts'
import type { CardBadges, UseMagicCardResult } from '../types'

export const useMagicCard = (card: Card): UseMagicCardResult => {
  const { currency } = useContext(CurrencyContext)
  const isDoubleFaced = !!(
    card.card_faces &&
    card.card_faces.length > 1 &&
    !card?.image_uris?.large
  )
  const [faceIndex, setFaceIndex] = useState(0)

  const imageUrl = isDoubleFaced
    ? card.card_faces?.[faceIndex]?.image_uris?.large
    : card.image_uris?.large

  const handleImageClick = () => {
    if (isDoubleFaced) {
      setFaceIndex(prev => (prev === 0 ? 1 : 0))
    }
  }

  const badges: CardBadges[] = []
  if (card.reprint) {
    badges.push('Reprint')
  }
  if (card.reserved) {
    badges.push('Reserved')
  }

  return {
    currency,
    imageUrl,
    handleImageClick,
    isDoubleFaced,
    faceIndex,
    badges,
  }
}
