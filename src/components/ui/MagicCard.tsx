import type { Card } from 'scryfall-api'
import { getCardPrice } from '../../utils'
import { useMagicCard } from '../../hooks'
import { ImageFlipper } from './ImageFlipper'
import clsx from 'clsx'
import { Badge } from './Badge'
import { Link } from 'react-router'
import { getFoilForCurrency } from '../../utils/currency'
import { HiOutlineSparkles } from 'react-icons/hi'

interface MagicCardProps {
  card: Card
  shouldDisplayName?: boolean
  shouldDisplayPrice?: boolean
  shouldDisplayBadges?: boolean
  variant?: 'default' | 'compact'
  onCardFlip?: () => void
  shouldOpenImageFile?: boolean
}

export const MagicCard: React.FC<MagicCardProps> = ({
  card,
  shouldDisplayName = true,
  shouldDisplayPrice = true,
  shouldDisplayBadges = true,
  variant = 'default',
  onCardFlip,
  shouldOpenImageFile = false,
}) => {
  const {
    currency,
    images,
    handleButtonClick,
    isDoubleSided,
    faceIndex,
    badges,
    cardName,
    faces,
    imageLink,
  } = useMagicCard(card, shouldOpenImageFile)

  // Compose click handler
  const handleCardFlip = () => {
    handleButtonClick()
    if (onCardFlip) onCardFlip()
  }

  const price = getCardPrice(card.prices, currency as keyof typeof card.prices)
  const foilPrice = getCardPrice(
    card.prices,
    getFoilForCurrency(currency) as keyof typeof card.prices
  )

  return (
    <div className="flex flex-col gap-1">
      {isDoubleSided ? (
        <ImageFlipper
          frontImageUrl={images[0]}
          frontImageAltText={faces[0]}
          backImageUrl={images[1]}
          backImageAltText={faces[1]}
          handleButtonClick={handleCardFlip}
          imageIndex={faceIndex}
          variant={variant}
          href={variant === 'compact' ? undefined : imageLink}
        />
      ) : (
        <span className="relative">
          {variant !== 'compact' ? (
            <Link to={imageLink} title={cardName} className={`absolute inset-0 z-10`} />
          ) : null}
          <img
            src={images[0]}
            alt={cardName}
            title={cardName}
            className={`w-full rounded-[4.75%/3.5%] ${isDoubleSided ? 'cursor-pointer' : ''}`}
            onClick={isDoubleSided ? handleCardFlip : undefined}
          />
        </span>
      )}
      {shouldDisplayName && variant !== 'compact' ? (
        <Link
          to={imageLink}
          title={cardName}
          className={`text-center text-black hover:underline truncate ${clsx({
            'text-sm': variant === 'default',
          })}`}>
          {isDoubleSided && variant === 'default' ? faces[faceIndex] : cardName}
        </Link>
      ) : null}
      {(shouldDisplayPrice || shouldDisplayBadges) && variant !== 'compact' ? (
        <div className="flex gap-1 items-center justify-center">
          {shouldDisplayBadges
            ? badges.map((badge, i) => {
                const keyValue = `${card.id.substring(0, 8)}--${i}`
                const title =
                  badge === 'Reserved'
                    ? 'This card will never be reprinted.'
                    : 'This card has previously appeared in another set.'
                return <Badge key={keyValue} text={badge} title={title} />
              })
            : null}
          {shouldDisplayPrice && price ? (
            <span className="text-xs text-gray-600 text-center">{price}</span>
          ) : null}
          {shouldDisplayPrice && foilPrice && price ? (
            <span className="text-xs text-gray-600 text-center"> / </span>
          ) : null}
          {shouldDisplayPrice && foilPrice ? (
            <span className="flex items-center gap-1">
              <span className="text-xs text-gray-600 text-center">{foilPrice}</span>
              <HiOutlineSparkles />
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
