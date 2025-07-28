import { SearchForm } from '../components/SearchForm'
import { Breadcrumb } from '../components/ui'

export const CardsPage: React.FC = () => {
  return (
    <>
      <Breadcrumb items={[{ name: 'Cards', path: `/cards/` }]} />
      <SearchForm />
    </>
  )
}
