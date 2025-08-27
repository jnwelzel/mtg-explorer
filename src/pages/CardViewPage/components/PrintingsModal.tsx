import { useEffect, useState, useTransition } from 'react'
import { Link, Modal } from '../../../components/ui'
import { Cards, type Card } from 'scryfall-api'
import type { ModalBaseProps } from '../../../types/modal'

type PrintingsModalProps = {
  cardName: string
} & ModalBaseProps

export const PrintingsModal: React.FC<PrintingsModalProps> = ({ cardName, ...modalProps }) => {
  const [isFetchingPrintings, startFetchingPrintings] = useTransition()
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    startFetchingPrintings(async () => {
      const prints = await Cards.search(cardName, { unique: 'prints' }).all()
      setCards(prints)
    })
  }, [cardName, startFetchingPrintings])

  return (
    <Modal title={`"${cardName}" Printings`} {...modalProps}>
      {isFetchingPrintings ? <p>Loading printings...</p> : null}
      {!isFetchingPrintings && cards.length > 0 ? (
        <ul>
          {cards.map(card => (
            <li key={card.id}>
              <Link to={`/cards/${card.id}`} className="text-sm md:text-base">
                {card.set_name} ({card.set.toUpperCase()}) #{card.collector_number}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </Modal>
  )
}
