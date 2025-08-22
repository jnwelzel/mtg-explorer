import { Button, Divider, Link, ReplaceWithBraces } from '../../../components/ui'
import { capitalize } from '../../../utils'
import { useState } from 'react'
import { useClickAway } from '@uidotdev/usehooks'
import { PrintingsModal } from './PrintingsModal'
import { createPortal } from 'react-dom'

interface CardFaceProps {
  name: string
  typeLine?: string | null
  oracleText?: string | null
  flavorText?: string | null
  manaCost?: string | null
  setName?: string
  setCode?: string
  setIconUrl?: string
  collectorNumber?: string
  rarity?: string
}

export const CardFace: React.FC<CardFaceProps> = ({
  name,
  typeLine,
  oracleText,
  flavorText,
  manaCost,
  setName,
  setCode,
  setIconUrl,
  collectorNumber,
  rarity,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useClickAway<HTMLDialogElement>(() => {
    setIsOpen(false)
  })

  return (
    <>
      <div className="flex items-center flex-wrap">
        <h1 className={`text-2xl font-extrabold text-gray-800${manaCost ? ' mr-2' : ''}`}>
          {name}
        </h1>
        {manaCost ? (
          <span>
            <ReplaceWithBraces text={manaCost} />
          </span>
        ) : null}
      </div>
      <h2 className="text-sm text-gray-600 font-semibold">{typeLine}</h2>
      {oracleText ? (
        <p className="text-md text-gray-600 mt-3">
          <ReplaceWithBraces text={oracleText} />
        </p>
      ) : null}
      {flavorText ? (
        <>
          <Divider />
          <p className="italic text-gray-500 text-sm">{flavorText}</p>
        </>
      ) : null}

      <div className="flex flex-col gap-1">
        {setName && setCode ? (
          <>
            <Divider />
            <Link to={`/sets/${setCode}?q=s:${setCode}`} className="flex items-center">
              <img src={setIconUrl} alt={`${setName} icon`} className="w-5 h-5 mr-1" /> {setName} (
              {setCode.toUpperCase()})
            </Link>
          </>
        ) : null}
        {collectorNumber ? (
          <span className="text-sm text-gray-600">
            #{collectorNumber}
            {rarity ? `, ${capitalize(rarity)}` : ''}
          </span>
        ) : null}
        <Button size="small" onClick={() => setIsOpen(true)} className="mr-auto">
          Show all printings
        </Button>
      </div>
      {isOpen
        ? createPortal(
            <PrintingsModal onClose={() => setIsOpen(false)} ref={ref} cardName={name} />,
            document.body
          )
        : null}
    </>
  )
}
