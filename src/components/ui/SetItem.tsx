import { NavLink } from 'react-router'
import type { Set } from 'scryfall-api'

interface SetItemProps {
  set: Set
}

export const SetItem: React.FC<SetItemProps> = ({ set }) => {
  return (
    <li className="flex items-center border rounded border-stone-400 shadow hover:shadow-md transition-shadow duration-200">
      <NavLink
        to={`/sets/${set.code}`}
        className="flex items-center text-black hover:underline px-2 md:p-3 py-2 w-full">
        <img src={set.icon_svg_uri} alt={`${set.name} icon`} className="w-5 h-5 mr-1" />
        {set.name}
      </NavLink>
    </li>
  )
}
