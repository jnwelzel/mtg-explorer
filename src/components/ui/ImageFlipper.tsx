interface ImageFlipperProps {
  frontImageUrl: string
  frontImageAltText: string
  backImageUrl: string
  backImageAltText: string
  handleImageClick: () => void
  imageIndex: number
}

export const ImageFlipper: React.FC<ImageFlipperProps> = ({
  frontImageUrl,
  frontImageAltText,
  backImageUrl,
  backImageAltText,
  handleImageClick,
  imageIndex,
}) => {
  return (
    <div
      className="bg-transparent perspective-distant aspect-5/7 w-full"
      onClick={handleImageClick}>
      <div
        className={`relative duration-700 transform-3d w-full h-full ${
          imageIndex ? 'rotate-y-180' : ''
        }`}>
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
