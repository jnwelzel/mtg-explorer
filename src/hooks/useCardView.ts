import { useEffect, useState, useTransition } from 'react'
import { Cards, type Card } from 'scryfall-api'

type UseCardViewResult = {
  card: Card | null
  isPending: boolean
}

export const useCardView = (cardId?: string): UseCardViewResult => {
  const [card, setCard] = useState<Card | null>(null)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (cardId) {
      const fetchCard = () => {
        startTransition(async () => {
          const card = await Cards.byId(cardId)
          if (card) {
            setCard(card)
          }
        })
      }

      fetchCard()
    }
  }, [cardId])

  return { card, isPending }
}
