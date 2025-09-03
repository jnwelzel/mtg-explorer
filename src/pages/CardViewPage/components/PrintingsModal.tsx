import { Fragment, use, useEffect, useState, useTransition } from 'react'
import { Link, MagicCard, Modal } from '../../../components/ui'
import { Cards, type Card } from 'scryfall-api'
import type { ModalBaseProps } from '../../../types/modal'
import { getCardPrice, getFoilForCurrency } from '../../../utils/currency'
import { HiOutlineSparkles } from 'react-icons/hi'
import { CurrencyContext } from '../../../contexts'
import { capitalize } from '../../../utils'

type PrintingsModalProps = {
  cardName: string
} & ModalBaseProps

export const PrintingsModal: React.FC<PrintingsModalProps> = ({ cardName, ...modalProps }) => {
  const [isFetchingPrintings, startFetchingPrintings] = useTransition()
  const [cards, setCards] = useState<Card[]>([])
  const { currency } = use(CurrencyContext)

  useEffect(() => {
    startFetchingPrintings(async () => {
      const prints = await Cards.search(cardName, { unique: 'prints' }).all()
      setCards(prints)
    })
  }, [cardName, startFetchingPrintings])

  return (
    <Modal title={`"${cardName}" Printings`} {...modalProps}>
      {isFetchingPrintings ? <p>Loading printings...</p> : null}
      {!isFetchingPrintings && cards.length > 0 ? (
        <ul className="grid grid-cols-12 gap-2">
          {cards.map(card => {
            const price = getCardPrice(card.prices, currency as keyof typeof card.prices)
            const foilPrice = getCardPrice(
              card.prices,
              getFoilForCurrency(currency) as keyof typeof card.prices
            )

            return (
              <Fragment key={card.id}>
                <div className="col-span-2">
                  <MagicCard
                    shouldDisplayName={false}
                    shouldDisplayBadges={false}
                    shouldDisplayPrice={false}
                    card={card}
                  />
                </div>
                <li className="col-span-10">
                  <div className="flex flex-col gap-1">
                    <Link to={`/cards/${card.id}`} className="text-sm md:text-base">
                      {card.set_name} ({card.set.toUpperCase()})
                    </Link>
                    <div className="text-sm text-gray-600">
                      #{card.collector_number}, {capitalize(card.rarity)}
                    </div>
                    <div className="flex">
                      {price ? (
                        <span className="text-xs text-gray-600 text-center">{price}</span>
                      ) : null}
                      {foilPrice && price ? (
                        <span className="text-xs text-gray-600 text-center"> / </span>
                      ) : null}
                      {foilPrice ? (
                        <span className="flex items-center gap-0.5">
                          <span className="text-xs text-gray-600 text-center">{foilPrice}</span>
                          <HiOutlineSparkles title="Foil" />
                        </span>
                      ) : null}
                    </div>
                  </div>
                </li>
              </Fragment>
            )
          })}
        </ul>
      ) : null}
    </Modal>
  )
}
