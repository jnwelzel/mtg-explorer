import { NavLink } from 'react-router'
import { Divider, ReplaceWithBraces } from '../../../components/ui'

interface CardFaceProps {
  name: string
  typeLine?: string | null
  oracleText?: string | null
  flavorText?: string | null
  manaCost?: string | null
  setName?: string
  setCode?: string
  setIconUrl?: string
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
          <p className="italic text-gray-500 text-sm">{flavorText}</p>
        </>
      ) : null}
      {setName && setCode ? (
        <>
          <Divider />
          <NavLink
            to={`/sets/${setCode}?q=s:${setCode}`}
            className="text-sm underline flex items-center">
            <img src={setIconUrl} alt={`${setName} icon`} className="w-5 h-5 mr-1" /> {setName} (
            {setCode.toUpperCase()})
          </NavLink>
        </>
      ) : null}
    </>
  )
}
