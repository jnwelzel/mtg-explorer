import { type Card, type Set } from 'scryfall-api'
import { Breadcrumb, Message } from '../../../components/ui'
import { use } from 'react'
import { useParams } from 'react-router'
import { CardsList } from '../../../components'
import { ResultsInfo } from '../../../components/SearchForm'
import { useZoomLevel } from '../../../hooks'
import { routesPath } from '../../../routes'
import { BiCalendar } from 'react-icons/bi'

interface SetDetailsProps {
  setPromise: Promise<Set | undefined>
  cardsPromise: Promise<Card[]>
}

export const SetDetails: React.FC<SetDetailsProps> = ({ setPromise, cardsPromise }) => {
  const set = use(setPromise)
  const cards = use(cardsPromise)
  const { code } = useParams<{ code: string }>()
  const { zoomLevel, onResultsPerPageClick, isMaxZoom, isMinZoom } = useZoomLevel()

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Sets', path: routesPath.sets },
          { name: set?.name || code || '', path: routesPath.setView(code || '') },
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
          {cards && cards.length > 0 ? (
            <>
              <ResultsInfo
                query={code}
                totalCount={cards.length}
                isLoading={false}
                onZoomInClick={() => onResultsPerPageClick('zoomIn')}
                onZoomOutClick={() => onResultsPerPageClick('zoomOut')}
                isMaxZoom={isMaxZoom}
                isMinZoom={isMinZoom}
              />
              <CardsList cards={cards} isLoading={false} zoomLevel={zoomLevel} />
            </>
          ) : null}
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
