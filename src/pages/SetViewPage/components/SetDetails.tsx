import { Cards, type Card, type Set } from 'scryfall-api'
import { Breadcrumb, Button, Message } from '../../../components/ui'
import { use, useState } from 'react'
import { useParams } from 'react-router'
import { CardsList } from '../../../components'
import { ResultsInfo } from '../../../components/SearchForm'
import { useZoomLevel } from '../../../hooks'
import { routesPath } from '../../../routes'

interface SetDetailsProps {
  setPromise: Promise<Set | undefined>
}

export const SetDetails: React.FC<SetDetailsProps> = ({ setPromise }) => {
  const set = use(setPromise)
  const { code } = useParams<{ code: string }>()
  const [cards, setCards] = useState<Card[] | null>(null)
  const { zoomLevel, onResultsPerPageClick, isMaxZoom, isMinZoom } = useZoomLevel()

  const fetchCards = async () => {
    const result = await Cards.search(`s:${code}`).all()
    setCards(result)
  }

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
            <img src={set.icon_svg_uri} alt={`${set.name} icon`} className="w-5 h-5" />
            <p>
              {set.name} ({set.code.toUpperCase()})
            </p>
          </div>
          <Button onClick={fetchCards} className="mt-3 md:mr-auto">
            View all cards from set
          </Button>
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
