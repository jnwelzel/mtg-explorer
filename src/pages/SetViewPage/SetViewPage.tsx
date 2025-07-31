import { Suspense } from 'react'
import { SetDetails } from './components/SetDetails'
import { Sets } from 'scryfall-api'
import { useParams } from 'react-router'

export const SetViewPage: React.FC = () => {
  const { code = '' } = useParams<{ code: string }>()
  const setPromise = Sets.byId(code)

  return (
    <Suspense fallback={<div>Loading set details and cards...</div>}>
      <SetDetails setPromise={setPromise} />
    </Suspense>
  )
}
