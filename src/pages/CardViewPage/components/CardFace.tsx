import { Divider, ReplaceWithBraces } from '../../../components/ui'

interface CardFaceProps {
  name: string
  typeLine?: string | null
  oracleText?: string | null
  flavorText?: string | null
  manaCost?: string | null
}

export const CardFace: React.FC<CardFaceProps> = ({
  name,
  typeLine,
  oracleText,
  flavorText,
  manaCost,
}) => {
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
          <p className="italic mt-1 text-gray-500 text-sm">{flavorText}</p>
        </>
      ) : null}
    </>
  )
}
