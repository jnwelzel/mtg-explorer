import { useEffect, useState, useTransition } from 'react'
import { Modal } from '../../../components/ui'
import { Cards, type Card } from 'scryfall-api'
import { NavLink } from 'react-router'

interface PrintingsModalProps {
  onClose: () => void
  ref: React.RefObject<HTMLDialogElement | null>
  cardName: string
}

export const PrintingsModal: React.FC<PrintingsModalProps> = ({ onClose, ref, cardName }) => {
  const [isFetchingPrintings, startFetchingPrintings] = useTransition()
  const [cards, setCards] = useState<Card[]>([])

  useEffect(() => {
    startFetchingPrintings(async () => {
      const prints = await Cards.search(cardName, { unique: 'prints' }).all()
      setCards(prints)
    })
  }, [cardName, startFetchingPrintings])

  return (
    <Modal title={`"${cardName}" Printings`} onClose={onClose} ref={ref}>
      {isFetchingPrintings ? <p>Loading printings...</p> : null}
      {!isFetchingPrintings && cards.length > 0 ? (
        <ul>
          {cards.map(card => (
            <li key={card.id}>
              <NavLink
                to={`/cards/${card.id}`}
                className={({ isActive }) =>
                  (isActive ? 'underline' : '') +
                  ' text-blue-500 hover:underline text-sm md:text-base'
                }>
                {card.set_name} ({card.set.toUpperCase()}) #{card.collector_number}
              </NavLink>
            </li>
          ))}
        </ul>
      ) : null}
    </Modal>
  )
}
