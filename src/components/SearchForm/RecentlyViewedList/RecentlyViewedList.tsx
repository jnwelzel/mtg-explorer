import type { Card } from 'scryfall-api'
import { MagicCard } from '../../ui'

interface RecentlyViewedListProps {
  recentlyViewedCards: Card[]
  onCardClick: (cardName: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const RecentlyViewedList: React.FC<RecentlyViewedListProps> = ({
  recentlyViewedCards,
  onCardClick,
  onFocus,
  onBlur,
}) => {
  return (
    <ul
      role="listbox"
      aria-label="Recently viewed cards"
      className="absolute z-20 bg-white border border-gray-300 rounded shadow-lg mt-11 grid gap-2 grid-cols-12 px-2 py-2 w-full"
      onFocus={onFocus}
      onBlur={e => {
        if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
          // Focus is still inside the list, do nothing
          return
        }
        onBlur?.()
      }}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          onBlur?.()
        }
      }}>
      <p className="col-span-12 text-sm text-center text-gray-500">Recently viewed</p>
      {recentlyViewedCards.map(card => (
        <li
          role="option"
          aria-label={card.name}
          key={card.id}
          tabIndex={0}
          className="recently-viewed-item cursor-pointer col-span-4"
          onClick={onCardClick.bind(null, card.name)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onCardClick(card.name)
            }
          }}>
          <MagicCard card={card} shouldDisplayPrice={false} variant="compact" />
        </li>
      ))}
    </ul>
  )
}
