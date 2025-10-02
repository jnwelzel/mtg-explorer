import { Link } from '../components/ui'
import { routesPath } from '../routes'
import { useHomePage } from '../hooks'
import { useDocumentTitle } from '@uidotdev/usehooks'
import { Footer } from '../components'

export const HomePage: React.FC = () => {
  useDocumentTitle('MTG Explorer')
  const { cardName, setCardName, handleSearchSubmit } = useHomePage()

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="container flex p-4 gap-4 justify-end mx-auto">
          <Link to={routesPath.cards} className="text-brand-blue hover:underline">
            Cards
          </Link>
          <Link to={routesPath.sets} className="text-brand-blue hover:underline">
            Sets
          </Link>
        </div>
      </div>
      <section className="h-screen snap-start flex flex-col items-center justify-center gap-4 px-4 bg-brand-yellow">
        <h1 className="pattaya-regular text-6xl md:text-8xl z-10 text-transparent text-outline-brand-blue">
          MTG Explorer
        </h1>
        <span>
          <p className="text-gray-700 text-center leading-5">
            Explore your favorite Magic: The Gathering <Link to={routesPath.cards}>cards</Link> and
            decks.
            <br />
            Catch up on the latest <Link to={routesPath.sets}>set releases</Link>, card updates and
            news.
            <br />
            Discover new strategies and manage your collection.
          </p>
        </span>
        <form action={handleSearchSubmit} className="max-w-lg w-full">
          <input
            type="search"
            placeholder="Search cards"
            name="q"
            className="w-full mx-auto bg-white border-brand-blue placeholder-brand-blue/80 p-2 h-10 flex items-center border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-brand-blue"
            onChange={e => setCardName(e.target.value)}
            value={cardName}
          />
        </form>
      </section>
      <Footer />
    </>
  )
}
