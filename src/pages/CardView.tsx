import { useParams } from 'react-router'
import { useCardView } from '../hooks'
import { MagicCard, ReplaceWithBraces } from '../components/ui'
import { isDoubleFaced, isDoubleSided } from '../utils'
import { useDocumentTitle } from '@uidotdev/usehooks'

export const CardView: React.FC = () => {
  const { id } = useParams<string>()
  const { card, isPending, flipCard, faceIndex, faces } = useCardView(id)
  useDocumentTitle(card ? `MTG Explorer - ${card.name}` : 'MTG Explorer')

  return (
    <>
      {isPending ? <p>Loading...</p> : null}
      {!isPending && card ? (
        <div className="grid grid-cols-1 md:grid-cols-12 mt-3 gap-3">
          <div className="md:col-span-3">
            <MagicCard
              card={card}
              shouldDisplayPrice={false}
              shouldDisplayName={false}
              shouldDisplayBadges={false}
              onCardFlip={flipCard}
              shouldOpenImageFile
            />
          </div>
          <div className="md:col-span-9 mt-3 md:mt-0">
            {isDoubleFaced(card) && !isDoubleSided(card) ? (
              faces.map((face, index) => {
                return (
                  <div
                    key={face.name ?? index}
                    className={`${index === 1 ? 'mt-3' : ''} col-span-full`}>
                    <h1 className="text-2xl font-extrabold text-gray-800">{face.name}</h1>
                    <h2 className="text-sm text-gray-600 font-semibold">{face.type_line}</h2>
                    <p className="text-md text-gray-600 mt-3">
                      <ReplaceWithBraces text={face.oracle_text ?? ''} />
                    </p>
                    <p className="italic mt-3 text-gray-500 text-sm">{face?.flavor_text}</p>
                  </div>
                )
              })
            ) : (
              <>
                <h1 className="text-2xl font-extrabold text-gray-800">{faces[faceIndex]?.name}</h1>
                <h2 className="text-sm text-gray-600 font-semibold">
                  {faces[faceIndex]?.type_line}
                </h2>
                <p className="text-md text-gray-600 mt-3">
                  <ReplaceWithBraces text={faces[faceIndex]?.oracle_text ?? ''} />
                </p>
                <p className="italic mt-3 text-gray-500 text-sm">{faces[faceIndex]?.flavor_text}</p>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
