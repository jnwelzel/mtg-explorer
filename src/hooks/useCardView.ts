import { use, useEffect, useState, useTransition } from 'react'
import { Cards, type Card, type CardFace } from 'scryfall-api'
import { isDoubleFaced, isDoubleSided } from '../utils'
import { RecentCardsContext } from '../contexts'

type UseCardViewResult = {
  card: Card | null
  isPending: boolean
  flipCard: () => void
  faceIndex: number
  faces: CardFace[]
}

export const useCardView = (cardId?: string): UseCardViewResult => {
  const [card, setCard] = useState<Card | null>(null)
  const [isPending, startTransition] = useTransition()
  const { addRecentlyViewedCard } = use(RecentCardsContext)
  const [faces, setFaces] = useState<CardFace[]>([])
  const [faceIndex, setFaceIndex] = useState(0)

  const flipCard = () => {
    if (faces.length > 1) {
      setFaceIndex(prev => (prev === 0 ? 1 : 0))
    }
  }

  useEffect(() => {
    if (cardId) {
      const fetchCard = () => {
        startTransition(async () => {
          const card = await Cards.byId(cardId)
          if (card) {
            addRecentlyViewedCard(card)
            if (isDoubleSided(card) || isDoubleFaced(card)) {
              setFaces(card.card_faces || [])
            } else {
              setFaces([
                {
                  name: card.name,
                  type_line: card.type_line,
                  oracle_text: card.oracle_text,
                  mana_cost: '',
                  object: 'card_face',
                  flavor_text: card.flavor_text,
                },
              ])
            }
            setCard(card)
          }
        })
      }

      fetchCard()
    }
  }, [cardId])

  return { card, isPending, flipCard, faceIndex, faces }
}
