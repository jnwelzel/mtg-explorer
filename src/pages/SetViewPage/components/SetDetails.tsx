import { type Set } from 'scryfall-api'
import { Breadcrumb, CardsListContainer, Message } from '../../../components/ui'
import { use } from 'react'
import { useParams } from 'react-router'
import { routesPath } from '../../../routes'
import { BiCalendar } from 'react-icons/bi'
import { useDocumentTitle } from '@uidotdev/usehooks'

interface SetDetailsProps {
  setPromise: Promise<Set | undefined>
}

export const SetDetails: React.FC<SetDetailsProps> = ({ setPromise }) => {
  const set = use(setPromise)
  const { code } = useParams<{ code: string }>()
  const releaseDate = set?.released_at
  const today = new Date()
  const isReleased = releaseDate ? new Date(releaseDate) <= today : false
  useDocumentTitle(`MTG Explorer - ${set?.name ?? ''}`)

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Sets', path: routesPath.sets },
          { name: set?.name ?? '', path: routesPath.setView(code || '') },
        ]}
      />
      {set ? (
        <>
          <div className="flex items-center gap-1 mt-1">
            <img src={set.icon_svg_uri} alt={`${set.name} icon`} className="w-6 h-6" />
            <h1 className="text-2xl font-bold">
              {set.name} ({set.code.toUpperCase()})
            </h1>
          </div>
          <div className="flex gap-1 items-center text-gray-500 mt-1">
            <BiCalendar className={`w-5 h-5 ${!isReleased ? 'text-red-400' : ''}`} />
            <p className={`text-sm ${!isReleased ? 'text-red-400' : ''}`}>
              {isReleased ? 'Released' : 'Releasing'} {releaseDate?.toLocaleDateString() ?? ''}
            </p>
          </div>
          <CardsListContainer hideClearSearch />
        </>
      ) : (
        <Message
          className="mt-3"
          variant="error"
          text={`Set ${code ? `"${code}"` : ''} not found.`}
        />
      )}
    </>
  )
}
