import { use } from 'react'
import type { Set } from 'scryfall-api'
import { useSets } from '../../../hooks'
import { Button, Message } from '../../../components/ui'
import { SetItems } from '.'

interface SetsListProps {
  setsPromise: Promise<Set[]>
}

export const SetsList: React.FC<SetsListProps> = ({ setsPromise }) => {
  const sets = use(setsPromise)
  const { allFirstLetters, allSetsByFirstLetter, currentFirstLetter, setCurrentFirstLetter } =
    useSets(sets)

  return (
    <>
      <menu className="flex flex-wrap">
        {allFirstLetters.map(letter => (
          <Button
            className="mx-2"
            variant="link"
            key={letter}
            onClick={() => setCurrentFirstLetter(letter)}>
            {letter}
          </Button>
        ))}
      </menu>
      {currentFirstLetter ? (
        <SetItems
          sets={allSetsByFirstLetter[currentFirstLetter].sort((a, b) =>
            a.name.localeCompare(b.name)
          )}
        />
      ) : (
        <Message text="Select a letter or number to view sets." className="mt-3" />
      )}
    </>
  )
}
