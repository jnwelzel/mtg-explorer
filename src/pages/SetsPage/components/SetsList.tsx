import { use } from 'react'
import type { Set } from 'scryfall-api'
import { useSets } from '../../../hooks'
import { Message } from '../../../components/ui'
import { SetItems } from '.'
import { NavLink } from 'react-router'

interface SetsListProps {
  setsPromise: Promise<Set[]>
}

export const SetsList: React.FC<SetsListProps> = ({ setsPromise }) => {
  const sets = use(setsPromise)
  const { allFirstLetters, allSetsByFirstLetter, setSearchParams, query } = useSets(sets)

  return (
    <>
      <menu className="flex flex-wrap">
        {allFirstLetters.map(letter => (
          <NavLink
            to={`/sets?q=${letter}`}
            className={`px-2 hover:underline text-blue-500${query === letter ? ' underline' : ''}`}
            key={letter}
            onClick={() => setSearchParams(letter)}>
            {letter}
          </NavLink>
        ))}
      </menu>
      {query ? (
        <SetItems sets={allSetsByFirstLetter[query].sort((a, b) => a.name.localeCompare(b.name))} />
      ) : (
        <Message text="Select a letter or number to view sets." className="mt-3" />
      )}
    </>
  )
}
