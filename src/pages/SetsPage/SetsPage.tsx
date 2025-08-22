import { Sets } from 'scryfall-api'
import { Breadcrumb } from '../../components/ui'
import { Suspense } from 'react'
import { SetsList } from './components'
import { routesPath } from '../../routes'
import { useDocumentTitle } from '@uidotdev/usehooks'

export const SetsPage: React.FC = () => {
  const setsPromise = Sets.all()
  useDocumentTitle('MTG Explorer - Sets')

  return (
    <>
      <Breadcrumb items={[{ name: 'Sets', path: routesPath.sets }]} />
      <Suspense fallback={<div>Loading sets...</div>}>
        <SetsList setsPromise={setsPromise} />
      </Suspense>
    </>
  )
}
