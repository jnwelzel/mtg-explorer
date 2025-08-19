import { ReplaceWithBraces } from '../../../components/ui'

interface CardFaceProps {
  name: string
  typeLine?: string | null
  oracleText?: string | null
  flavorText?: string | null
}

export const CardFace: React.FC<CardFaceProps> = ({ name, typeLine, oracleText, flavorText }) => {
  return (
    <>
      <h1 className="text-2xl font-extrabold text-gray-800">{name}</h1>
      <h2 className="text-sm text-gray-600 font-semibold">{typeLine}</h2>
      {oracleText && (
        <p className="text-md text-gray-600 mt-3">
          <ReplaceWithBraces text={oracleText} />
        </p>
      )}
      {flavorText && <p className="italic mt-3 text-gray-500 text-sm">{flavorText}</p>}
    </>
  )
}
