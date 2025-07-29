import type { Card } from 'scryfall-api'
import { MagicCard, MagicCardSkeleton } from '../../ui'
import type { ZoomLevel } from '../../../types'

interface CardsListProps {
  cards: Card[]
  isLoading?: boolean
  zoomLevel?: ZoomLevel
}

const ZOOM_CLASSES: Record<ZoomLevel, string> = {
  '0': 'col-span-1 md:col-span-1 lg:col-span-1',
  '0.25': 'col-span-3 md:col-span-1 lg:col-span-1',
  '0.5': 'col-span-4 md:col-span-2 lg:col-span-1',
  '0.75': 'col-span-6 md:col-span-2 lg:col-span-1',
  '1': 'col-span-full md:col-span-3 lg:col-span-2',
  '1.25': 'col-span-full md:col-span-4 lg:col-span-3',
  '1.5': 'col-span-full md:col-span-6 lg:col-span-4',
  '1.75': 'col-span-full md:col-span-full lg:col-span-6',
  '2': 'col-span-full md:col-span-full lg:col-span-full',
}

const GRID_COL_CLASSES = {
  '0': 'grid-cols-5 md:grid-cols-8 lg:grid-cols-10',
  '0.25': 'grid-cols-12 md:grid-cols-7 lg:grid-cols-9',
  '0.5': 'grid-cols-12 md:grid-cols-12 lg:grid-cols-8',
  '0.75': 'grid-cols-12 md:grid-cols-10 lg:grid-cols-7',
  '1': 'grid-cols-12',
  '1.25': 'grid-cols-12',
  '1.5': 'grid-cols-12',
  '1.75': 'grid-cols-12',
  '2': 'grid-cols-12',
}

export const CardsList: React.FC<CardsListProps> = ({
  cards,
  isLoading = false,
  zoomLevel = 1,
}) => {
  return (
    <ul className={`grid gap-4 mt-3 ${GRID_COL_CLASSES[zoomLevel.toString() as ZoomLevel]}`}>
      {isLoading ? <MagicCardSkeleton /> : null}
      {!isLoading &&
        cards.length > 0 &&
        cards.map(card => (
          <li key={card.id} className={ZOOM_CLASSES[zoomLevel.toString() as ZoomLevel]}>
            <MagicCard shouldDisplayPrice card={card} />
          </li>
        ))}
    </ul>
  )
}
