import { useDocumentTitle } from '@uidotdev/usehooks'
import { SearchForm } from '../components/SearchForm'
import { Breadcrumb } from '../components/ui'
import { routesPath } from '../routes'

export const CardsPage: React.FC = () => {
  useDocumentTitle('MTG Explorer - Cards Search')

  return (
    <>
      <Breadcrumb items={[{ name: 'Cards', path: routesPath.cards }]} />
      <SearchForm />
    </>
  )
}
