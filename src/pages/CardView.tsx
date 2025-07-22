import { useParams } from 'react-router'
import { useCardView } from '../hooks'
import { MagicCard } from '../components/ui'
import { ReplaceWithBraces } from '../components/ui/ReplaceWithBraces'

export const CardView: React.FC = () => {
  const { id } = useParams<string>()
  const { card, isPending } = useCardView(id)

  console.log('&&&&&&&&&&&&&&&&&', card?.oracle_text?.replaceAll(/\\n/g, '\\n'))

  return (
    <div>
      {isPending ? <p>Loading...</p> : null}
      {!isPending && card ? (
        <div className="grid grid-cols-1 md:grid-cols-12 mt-3 gap-3">
          <div className="col-span-3 md:col-span-3">
            <MagicCard
              card={card}
              shouldDisplayPrice={false}
              shouldDisplayName={false}
              shouldDisplayBadges={false}
            />
            <div className="md:hidden">
              <h1 className="text-2xl font-extrabold text-gray-800 mt-3">{card.name}</h1>
              <h2 className="text-sm text-gray-600 font-semibold">{card.type_line}</h2>
              <p className="text-md text-gray-600 mt-3">{card.oracle_text}</p>
            </div>
          </div>
          <div className="hidden md:flex md:col-span-9 md:flex-col">
            <h1 className="text-2xl font-extrabold text-gray-800">{card.name}</h1>
            <h2 className="text-sm text-gray-600 font-semibold">{card.type_line}</h2>
            <p className="text-md text-gray-600 mt-3">
              {/* {card.oracle_text} */}
              <ReplaceWithBraces text={card?.oracle_text?.replaceAll(/\\n/g, '\\n') ?? ''} />
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
