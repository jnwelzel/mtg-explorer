import type { Set } from 'scryfall-api'
import { SetItem } from '../../../components/ui'

interface SetItemsProps {
  sets: Set[]
}

export const SetItems: React.FC<SetItemsProps> = ({ sets }) => {
  return (
    <ul className="list-none mt-3 flex flex-col gap-2 md:gap-3 md:flex-row md:flex-wrap">
      {sets.map(set => (
        <SetItem key={set.id} set={set} />
      ))}
    </ul>
  )
}
