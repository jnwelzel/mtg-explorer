import { useParams } from 'react-router'
import { useCardView } from '../../hooks'
import { Breadcrumb, Dropdown, MagicCard } from '../../components/ui'
import { getMarketProviderLabel, isDoubleFaced, isDoubleSided } from '../../utils'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { routesPath } from '../../routes'
import { CardFace, LegalitiesList } from './components'

export const CardViewPage: React.FC = () => {
  const { id } = useParams<string>()
  const { card, isPending, flipCard, faceIndex, faces, cardSet } = useCardView(id)
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
                  label: getMarketProviderLabel(provider),
                  href: url || '#',
                }))}
              />
            ) : null}
          </div>
          <div className="md:col-span-5">
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
                      setName={index > 0 ? card.set_name : undefined}
                      setCode={index > 0 ? card.set : undefined}
                      setIconUrl={cardSet?.icon_svg_uri}
                      collectorNumber={index > 0 ? card.collector_number : undefined}
                      rarity={card.rarity}
                    />
                  </div>
                )
              })
            ) : (
              <CardFace
                name={faces[faceIndex].name}
                typeLine={faces[faceIndex].type_line}
                oracleText={faces[faceIndex].oracle_text}
                flavorText={faces[faceIndex].flavor_text}
                manaCost={card.mana_cost || faces[faceIndex].mana_cost}
                setName={card.set_name}
                setCode={card.set}
                setIconUrl={cardSet?.icon_svg_uri}
                collectorNumber={card.collector_number}
                rarity={card.rarity}
              />
            )}
          </div>
          <div className="md:col-span-4">
            <LegalitiesList legalities={card.legalities} />
          </div>
        </div>
      ) : null}
    </>
  )
}
