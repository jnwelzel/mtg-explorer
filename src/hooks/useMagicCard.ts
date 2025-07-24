import { use, useState } from 'react'
import type { Card } from 'scryfall-api'
import { CurrencyContext } from '../contexts'
import type { CardBadge, UseMagicCardResult } from '../types'
import { isDoubleSided } from '../utils'

export const useMagicCard = (card: Card, shouldOpenImageFile: boolean): UseMagicCardResult => {
  const { currency } = use(CurrencyContext)
  const [faceIndex, setFaceIndex] = useState(0)

  const handleButtonClick = () => {
    if (isDoubleSided(card)) {
      setFaceIndex(prev => (prev === 0 ? 1 : 0))
    }
  }

  const images = []
  const faces = []
  if (isDoubleSided(card)) {
    images.push(card.card_faces?.[0]?.image_uris?.large ?? '')
    images.push(card.card_faces?.[1]?.image_uris?.large ?? '')

    faces.push(card.card_faces?.[0]?.name ?? '')
    faces.push(card.card_faces?.[1]?.name ?? '')
  } else {
    images.push(card.image_uris?.large ?? '')
    faces.push(card.name)
  }

  const badges: CardBadge[] = []
  if (card.reprint) {
    badges.push('Reprint')
  }
  if (card.reserved) {
    badges.push('Reserved')
  }

  const imageLink = shouldOpenImageFile ? images[faceIndex] : `/cards/${card.id}`

  return {
    currency,
    images,
    handleButtonClick,
    isDoubleSided: isDoubleSided(card),
    faceIndex,
    badges,
    cardName: card.name,
    faces,
    imageLink,
  }
}
