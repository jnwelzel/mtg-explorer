import type { Card } from 'scryfall-api'
import { getCardPrice } from '../../utils'
import { useMagicCard } from '../../hooks'
import { ImageFlipper } from './ImageFlipper'
import clsx from 'clsx'

interface MagicCardProps {
  card: Card
  shouldDisplayName?: boolean
  shouldDisplayPrice?: boolean
  variant?: 'default' | 'compact'
}

const MagicCard: React.FC<MagicCardProps> = ({
  card,
  shouldDisplayName = true,
  shouldDisplayPrice = true,
  variant = 'default',
}) => {
  const { currency, imageUrl, handleImageClick, isDoubleFaced, faceIndex } = useMagicCard(card)

  return (
    <div className="flex flex-col">
      {isDoubleFaced ? (
        <ImageFlipper
          frontImageUrl={card.card_faces?.[0]?.image_uris?.large || ''}
          frontImageAltText={card.card_faces?.[0]?.name || ''}
          backImageUrl={card.card_faces?.[1]?.image_uris?.large || ''}
          backImageAltText={card.card_faces?.[1]?.name || ''}
          handleImageClick={handleImageClick}
          imageIndex={faceIndex}
        />
      ) : (
        <img
          src={imageUrl}
          alt={card.name}
          title={card.name}
          className={`w-full rounded-lg ${isDoubleFaced ? 'cursor-pointer' : ''}`}
          onClick={isDoubleFaced ? handleImageClick : undefined}
        />
      )}
      {shouldDisplayName && (
        <span
          title={card.name}
          className={`text-center truncate ${clsx({
            'text-xs': variant === 'compact',
            'mt-1': variant === 'default',
            'text-sm': variant === 'default',
          })}`}>
          {isDoubleFaced && variant === 'default' ? card.card_faces?.[faceIndex]?.name : card.name}
        </span>
      )}
      {shouldDisplayPrice ? (
        <span className="text-xs text-gray-600 text-center">
          {getCardPrice(card.prices, currency as keyof typeof card.prices)}
        </span>
      ) : null}
    </div>
  )
}

export { MagicCard }
