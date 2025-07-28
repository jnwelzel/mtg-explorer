import { Cards, type Card, type Set } from 'scryfall-api'
import { Breadcrumb, Button, MagicCard, Message } from '../../../components/ui'
import { use, useState } from 'react'
import { useParams } from 'react-router'

interface SetDetailsProps {
  setPromise: Promise<Set | undefined>
}

export const SetDetails: React.FC<SetDetailsProps> = ({ setPromise }) => {
  const set = use(setPromise)
  const { code } = useParams<{ code: string }>()
  const [cards, setCards] = useState<Card[] | null>(null)

  const fetchCards = async () => {
    const result = await Cards.search(`s:${code}`).all()
    setCards(result)
  }

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Sets', path: `/sets` },
          { name: set?.name || code || '', path: `/sets/${code}` },
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
          <Button onClick={fetchCards}>View cards ({set.card_count})</Button>
          {cards && cards.length > 0 ? (
            <ul className="grid grid-cols-12 gap-4 mt-3">
              {cards.map(card => (
                <li key={card.id} className="col-span-full md:col-span-3 lg:col-span-2">
                  <MagicCard card={card} shouldDisplayPrice />
                </li>
              ))}
            </ul>
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
