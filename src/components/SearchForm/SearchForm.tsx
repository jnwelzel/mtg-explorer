import { useCardSearch } from '../../hooks'
import { Button, Input, MagicCard } from '../ui'
import { CardsList } from './CardsList'

const SearchForm: React.FC = () => {
  const {
    cards,
    cardName,
    nameSuggestions,
    handleSearchChange,
    handleSearchSubmit,
    handleSuggestionClick,
    searchHistory,
    isInputFocused,
    setIsInputFocused,
    isPending,
    handleClearSearch,
  } = useCardSearch()

  return (
    <>
      <form
        className="grid gap-3 w-full mt-3 grid-cols-12"
        action={handleSearchSubmit.bind(null, cardName)}>
        <div className="flex w-full relative col-span-9 md:col-span-3">
          <Input
            placeholder="Black Lotus"
            value={cardName}
            onChange={handleSearchChange}
            type="search"
            name="cardName"
            onFocus={() => {
              setIsInputFocused(true)
            }}
            onBlur={() => {
              setTimeout(() => setIsInputFocused(false), 100)
            }}
          />
          {nameSuggestions.length > 0 ? (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-11 max-h-60 overflow-y-auto">
              {nameSuggestions.map(suggestion => (
                <li
                  key={suggestion}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleSuggestionClick.bind(null, suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : null}
          {searchHistory.length > 0 && cardName === '' && isInputFocused ? (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg mt-11 grid gap-2 grid-cols-12 px-2 py-2">
              <p className="col-span-12 text-sm text-gray-500">Recently viewed</p>
              {searchHistory.map(card => (
                <li
                  key={card.id}
                  className="cursor-pointer col-span-4"
                  onClick={handleSearchSubmit.bind(null, card.name)}>
                  <MagicCard card={card} shouldDisplayPrice={false} variant="compact" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Button type="submit" isLoading={isPending} className="col-span-3 md:col-span-2">
          Search
        </Button>
      </form>
      {cards.length > 0 && !isPending ? (
        <span className="flex items-center text-sm mt-4 gap-1">
          <p className="text-gray-500">
            Search for "{cardName}" returned {cards.length} result{cards.length > 1 ? 's' : ''}
          </p>
          •
          <Button onClick={handleClearSearch} type="button" variant="link">
            clear results
          </Button>
        </span>
      ) : null}
      <CardsList cards={cards} isLoading={isPending} />
    </>
  )
}

export { SearchForm }
