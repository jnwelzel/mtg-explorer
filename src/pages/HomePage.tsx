import { Input, Link } from '../components/ui'
import { routesPath } from '../routes'
import { useHomePage } from '../hooks'
import { useDocumentTitle } from '@uidotdev/usehooks'

export const HomePage: React.FC = () => {
  useDocumentTitle('MTG Explorer')
  const { cardName, setCardName, handleSearchSubmit } = useHomePage()

  return (
    <main className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold mt-32 text-center">MTG Explorer</h1>
      <span>
        <p className="text-gray-700 text-center leading-5">
          Explore your favorite Magic: The Gathering <Link to={routesPath.cards}>cards</Link> and
          decks.
        </p>
        <p className="text-gray-700 text-center leading-5">
          Catch up on the latest <Link to={routesPath.sets}>set releases</Link>, card updates and
          news.
        </p>
        <p className="text-gray-700 text-center leading-5">
          Discover new strategies and manage your collection.
        </p>
      </span>
      <form action={handleSearchSubmit}>
        <Input
          placeholder="Search cards"
          name="q"
          className="max-w-lg mx-auto"
          onChange={e => setCardName(e.target.value)}
          value={cardName}
        />
      </form>
    </main>
  )
}
