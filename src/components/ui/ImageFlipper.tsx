import { Button } from './Button'

import flipCardIcon from '../../assets/flipCard.svg'
import { Link } from 'react-router'

interface ImageFlipperProps {
  frontImageUrl: string
  frontImageAltText: string
  backImageUrl: string
  backImageAltText: string
  handleButtonClick: () => void
  imageIndex: number
  variant?: 'default' | 'compact'
  href?: string
}

export const ImageFlipper: React.FC<ImageFlipperProps> = ({
  frontImageUrl,
  frontImageAltText,
  backImageUrl,
  backImageAltText,
  handleButtonClick,
  imageIndex,
  variant = 'default',
  href,
}) => {
  return (
    <div className="bg-transparent perspective-distant aspect-5/7 w-full">
      <div
        className={`relative duration-700 transform-3d w-full h-full 
        ${imageIndex ? 'rotate-y-180' : ''}`}>
        <Button
          title="Click to flip card"
          onClick={handleButtonClick}
          variant="unstyled"
          className={`absolute z-20 rotate-[-90deg] translate-y-[-50%] top-[50%] h-[10%] w-[14%] left-1 items-center flex 
            rounded-full bg-black/70 outline-white/70 outline-2 outline-offset-1 cursor-pointer ${variant === 'compact' ? 'hidden' : ''}`}>
          <img src={flipCardIcon} alt="Flip card icon" className="opacity-70 h-full" />
        </Button>
        {href ? <Link to={href} className="absolute inset-0 z-10" /> : null}
        <img
          src={frontImageUrl}
          alt={frontImageAltText}
          title={frontImageAltText}
          className="w-full rounded-lg cursor-pointer absolute backface-hidden"
        />
        <img
          src={backImageUrl}
          alt={backImageAltText}
          title={backImageAltText}
          className="w-full rounded-lg cursor-pointer absolute backface-hidden rotate-y-180"
        />
      </div>
    </div>
  )
}
