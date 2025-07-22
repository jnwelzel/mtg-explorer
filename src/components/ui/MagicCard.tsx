import type { Card } from 'scryfall-api'
import { getCardPrice } from '../../utils'
import { useMagicCard } from '../../hooks'
import { ImageFlipper } from './ImageFlipper'
import clsx from 'clsx'
import { Badge } from './Badge'
import { Link } from 'react-router'

interface MagicCardProps {
  card: Card
  shouldDisplayName?: boolean
  shouldDisplayPrice?: boolean
  shouldDisplayBadges?: boolean
  variant?: 'default' | 'compact'
  onClick?: () => void
}

export const MagicCard: React.FC<MagicCardProps> = ({
  card,
  shouldDisplayName = true,
  shouldDisplayPrice = true,
  shouldDisplayBadges = true,
  variant = 'default',
  onClick,
}) => {
  const { currency, images, handleImageClick, isDoubleSided, faceIndex, badges, cardName, faces } =
    useMagicCard(card)

  // Compose click handler
  const handleCardClick = () => {
    if (onClick) onClick()
  }

  return (
    <div className="flex flex-col" onClick={handleCardClick}>
      {isDoubleSided ? (
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
          className={`w-full rounded-[4.75%/3.5%] ${isDoubleSided ? 'cursor-pointer' : ''}`}
          onClick={isDoubleSided ? handleImageClick : undefined}
        />
      )}
      {shouldDisplayName ? (
        <Link
          to={`/cards/${card.id}`}
          title={cardName}
          className={`text-center underline truncate mt-1 ${clsx({
            'text-xs': variant === 'compact',
            'text-sm': variant === 'default',
          })}`}>
          {isDoubleSided && variant === 'default' ? faces[faceIndex] : cardName}
        </Link>
      ) : null}
      {shouldDisplayPrice || shouldDisplayBadges ? (
        <div className="flex gap-1 items-center justify-center">
          {variant === 'default' && shouldDisplayBadges
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
      ) : null}
    </div>
  )
}
