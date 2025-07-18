import type { Card } from 'scryfall-api'
import { getCardPrice } from '../../utils'
import { useMagicCard } from '../../hooks'
import { ImageFlipper } from './ImageFlipper'
import clsx from 'clsx'
import { Badge } from './Badge'

interface MagicCardProps {
  card: Card
  shouldDisplayName?: boolean
  shouldDisplayPrice?: boolean
  variant?: 'default' | 'compact'
}

export const MagicCard: React.FC<MagicCardProps> = ({
  card,
  shouldDisplayName = true,
  shouldDisplayPrice = true,
  variant = 'default',
}) => {
  const { currency, images, handleImageClick, isDoubleFaced, faceIndex, badges, cardName, faces } =
    useMagicCard(card)

  return (
    <div className="flex flex-col">
      {isDoubleFaced ? (
        <ImageFlipper
          frontImageUrl={images[0]}
          frontImageAltText={faces[0]}
          backImageUrl={images[1]}
          backImageAltText={faces[1]}
          handleImageClick={handleImageClick}
          imageIndex={faceIndex}
        />
      ) : (
        <img
          src={images[0]}
          alt={cardName}
          title={cardName}
          className={`w-full rounded-lg ${isDoubleFaced ? 'cursor-pointer' : ''}`}
          onClick={isDoubleFaced ? handleImageClick : undefined}
        />
      )}
      {shouldDisplayName ? (
        <span
          title={cardName}
          className={`text-center truncate mt-1 ${clsx({
            'text-xs': variant === 'compact',
            'text-sm': variant === 'default',
          })}`}>
          {isDoubleFaced && variant === 'default' ? faces[faceIndex] : cardName}
        </span>
      ) : null}
      <div className="flex gap-1 items-center justify-center">
        {variant === 'default'
          ? badges.map((badge, i) => (
              <Badge key={`${card.id.substring(0, 8)}--${i}`} text={badge} />
            ))
          : null}
        {shouldDisplayPrice ? (
          <span className="text-xs text-gray-600 text-center">
            {getCardPrice(card.prices, currency as keyof typeof card.prices)}
          </span>
        ) : null}
      </div>
    </div>
  )
}
