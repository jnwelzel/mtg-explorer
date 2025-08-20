import type { Legalities, Legality } from 'scryfall-api'
import { IoBan, IoCheckmarkCircle, IoCloseCircle, IoWarning } from 'react-icons/io5'
import { FORMATS } from '../../../utils'

interface LegalitiesProps {
  legalities: Legalities
}

const ICONS = (legality: Legality) => {
  switch (legality) {
    case 'legal':
      return <IoCheckmarkCircle className="w-5 h-5 text-success" title="Legal" />
    case 'not_legal':
      return <IoBan className="w-5 h-5 text-stone-500" title="Not Legal" />
    case 'banned':
      return <IoCloseCircle className="w-5 h-5 text-error" title="Banned" />
    case 'restricted':
      return (
        <IoWarning className="w-5 h-5 text-warning" title="Restricted (only one copy allowed)" />
      )
    default:
      return null
  }
}

export const LegalitiesList: React.FC<LegalitiesProps> = ({ legalities }) => {
  return (
    <>
      <h3 className="font-bold">Legalities</h3>
      <ul className="grid grid-cols-3 gap-2 mt-1">
        {Object.entries(legalities)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([format, status]) => (
            <li className="flex gap-1 items-center text-sm" key={format}>
              {ICONS(status)}
              <span>{FORMATS[format as keyof typeof FORMATS]}</span>
            </li>
          ))}
      </ul>
    </>
  )
}
