import { SearchForm } from '../components/SearchForm'
import { Breadcrumb } from '../components/ui'
import { routesPath } from '../routes'

export const CardsPage: React.FC = () => {
  return (
    <>
      <Breadcrumb items={[{ name: 'Cards', path: routesPath.cards }]} />
      <SearchForm />
    </>
  )
}
