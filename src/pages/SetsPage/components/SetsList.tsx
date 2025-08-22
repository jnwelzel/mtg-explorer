import { use } from 'react'
import type { Set } from 'scryfall-api'
import { useSets } from '../../../hooks'
import { Link, Message } from '../../../components/ui'
import { SetItems } from '.'

interface SetsListProps {
  setsPromise: Promise<Set[]>
}

export const SetsList: React.FC<SetsListProps> = ({ setsPromise }) => {
  const sets = use(setsPromise)
  // TODO - use a more efficient way to filter sets dinamically
  // This is a temporary solution to filter sets by year
  const { allFirstLetters, allSetsByFirstLetter, setSearchParams, query, allSetsByYear } =
    useSets(sets)

  return (
    <>
      <menu className="flex flex-wrap">
        {Object.keys(allSetsByYear).map(year => (
          <Link
            to={`/sets?q=${year}`}
            className={`px-2 hover:underline text-blue-500${query === year ? ' underline' : ''}`}
            key={year}>
            {year}
          </Link>
        ))}
      </menu>
      {query ? (
        <>
          <p className="text-gray-500 text-sm mt-3">{`Showing ${allSetsByYear[query].length} result${allSetsByYear[query].length === 1 ? '' : 's'} for "${query}"`}</p>
          <SetItems
            sets={(allSetsByYear[query] ?? []).slice().sort((a, b) => {
              const aMonth = a?.released_at instanceof Date ? a.released_at.getMonth() : 0
              const bMonth = b?.released_at instanceof Date ? b.released_at.getMonth() : 0
              return aMonth - bMonth
            })}
          />
        </>
      ) : (
        <Message text="Select an option to view sets." className="mt-3" />
      )}
    </>
  )
}
