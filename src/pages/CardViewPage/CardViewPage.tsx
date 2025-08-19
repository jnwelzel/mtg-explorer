import { useParams } from 'react-router'
import { useCardView } from '../../hooks'
import { Breadcrumb, Dropdown, MagicCard, ReplaceWithBraces } from '../../components/ui'
import { isDoubleFaced, isDoubleSided } from '../../utils'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { routesPath } from '../../routes'
import { CardFace } from './components'

export const CardViewPage: React.FC = () => {
  const { id } = useParams<string>()
  const { card, isPending, flipCard, faceIndex, faces } = useCardView(id)
  useDocumentTitle(card ? `MTG Explorer - ${card.name}` : 'MTG Explorer')

  return (
    <>
      <Breadcrumb
        items={[
          { name: 'Cards', path: routesPath.cards },
          { name: card?.name ?? '', path: routesPath.cardView(card?.id ?? '') },
        ]}
      />
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
            {card?.purchase_uris ? (
              <Dropdown
                label="Buy"
                className="mt-3"
                items={Object.entries(card.purchase_uris).map(([provider, url]) => ({
                  label: provider,
                  href: url || '#',
                }))}
              />
            ) : null}
          </div>
          <div className="md:col-span-9 mt-3 md:mt-0">
            {isDoubleFaced(card) && !isDoubleSided(card) ? (
              faces.map((face, index) => {
                return (
                  <div
                    key={face.name ?? index}
                    className={`${index === 1 ? 'mt-3' : ''} col-span-full`}>
                    <CardFace
                      name={face.name}
                      typeLine={face.type_line}
                      oracleText={face.oracle_text}
                      flavorText={face.flavor_text}
                      manaCost={face.mana_cost}
                    />
                  </div>
                )
              })
            ) : (
              <CardFace
                name={card.name}
                typeLine={card.type_line}
                oracleText={card.oracle_text}
                flavorText={card.flavor_text}
                manaCost={card.mana_cost}
              />
            )}
          </div>
        </div>
      ) : null}
    </>
  )
}
