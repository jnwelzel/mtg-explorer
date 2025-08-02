import { type Set } from 'scryfall-api'
import { Breadcrumb, Message } from '../../../components/ui'
import { use } from 'react'
import { useParams } from 'react-router'
import { routesPath } from '../../../routes'
import { BiCalendar } from 'react-icons/bi'
import { CardsListContainer } from '../../../components/SearchForm'

interface SetDetailsProps {
  setPromise: Promise<Set | undefined>
}

export const SetDetails: React.FC<SetDetailsProps> = ({ setPromise }) => {
  const set = use(setPromise)
  const { code } = useParams<{ code: string }>()

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
          <div className="flex items-center gap-1">
            <img src={set.icon_svg_uri} alt={`${set.name} icon`} className="w-6 h-6" />
            <h1 className="text-2xl font-bold">
              {set.name} ({set.code.toUpperCase()})
            </h1>
          </div>
          <div className="flex gap-1 items-center text-gray-500">
            <BiCalendar className="w-5 h-5" />
            <p className="text-sm">Released {set?.released_at?.toLocaleDateString() ?? ''}</p>
          </div>
          <CardsListContainer />
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
