import type { Card } from 'scryfall-api'
import { MagicCard, MagicCardSkeleton } from '../../ui'

interface CardsListProps {
  cards: Card[]
  isLoading?: boolean
}

export const CardsList: React.FC<CardsListProps> = ({ cards, isLoading = false }) => {
  return (
    <ul className="grid grid-cols-12 gap-4 mt-3">
      {isLoading ? <MagicCardSkeleton /> : null}
      {!isLoading &&
        cards.length > 0 &&
        cards.map(card => (
          <li key={card.id} className="col-span-full md:col-span-3 lg:col-span-2">
            <MagicCard shouldDisplayPrice card={card} />
          </li>
        ))}
    </ul>
  )
}
