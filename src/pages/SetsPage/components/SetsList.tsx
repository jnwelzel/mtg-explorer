import { use } from 'react'
import type { Set } from 'scryfall-api'
import { SetsTable } from '../../../components/ui'

interface SetsListProps {
  setsPromise: Promise<Set[]>
}

export const SetsList: React.FC<SetsListProps> = ({ setsPromise }) => {
  const sets = use(setsPromise)

  return <SetsTable setsData={sets} />
}
