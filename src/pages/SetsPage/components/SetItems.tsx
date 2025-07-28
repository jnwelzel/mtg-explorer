import { NavLink } from 'react-router'
import type { Set } from 'scryfall-api'

interface SetItemsProps {
  sets: Set[]
}

export const SetItems: React.FC<SetItemsProps> = ({ sets }) => {
  return (
    <ul className="list-none mt-3">
      {sets.map(set => (
        <li key={set.id} className="flex items-center">
          <NavLink
            to={`/sets/${set.code}`}
            className="flex items-center text-black hover:underline">
            <img src={set.icon_svg_uri} alt={`${set.name} icon`} className="w-5 h-5 mr-1" />
            {set.name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
