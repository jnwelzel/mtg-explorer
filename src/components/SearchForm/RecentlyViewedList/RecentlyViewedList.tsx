import type { Card } from 'scryfall-api'
import { MagicCard } from '../../ui'

interface RecentlyViewedListProps {
  recentlyViewedCards: Card[]
  onCardClick: (cardName: string) => void
}

export const RecentlyViewedList: React.FC<RecentlyViewedListProps> = ({
  recentlyViewedCards,
  onCardClick,
}) => {
  return (
    <ul className="absolute z-20 bg-white border border-gray-300 rounded shadow-lg mt-11 grid gap-2 grid-cols-12 px-2 py-2 w-full">
      <p className="col-span-12 text-sm text-center text-gray-500">Recently viewed</p>
      {recentlyViewedCards.map(card => (
        <li
          key={card.id}
          className="cursor-pointer col-span-4"
          onClick={onCardClick.bind(null, card.name)}>
          <MagicCard card={card} shouldDisplayPrice={false} variant="compact" />
        </li>
      ))}
    </ul>
  )
}
