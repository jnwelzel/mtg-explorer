import { useCardSearch } from '../../hooks'
import { Button, Input, MagicCard } from '../ui'
import { CardsList } from './CardsList'

export const SearchForm: React.FC = () => {
  const { handlers, data, flags } = useCardSearch()

  return (
    <>
      <form
        className="grid gap-3 w-full mt-3 grid-cols-12"
        action={handlers.onSearchSubmit.bind(null, undefined)}>
        <div className="flex w-full relative col-span-9 md:col-span-4">
          <Input
            placeholder="Black Lotus"
            value={data.cardName}
            onChange={handlers.onSearchChange}
            type="search"
            name="cardName"
            onFocus={() => {
              handlers.setIsInputFocused(true)
            }}
            onBlur={() => {
              setTimeout(() => handlers.setIsInputFocused(false), 100)
            }}
          />
          {data.nameSuggestions.length > 0 && !flags.isPending && flags.isInputFocused ? (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-11 max-h-60 overflow-y-auto">
              {data.nameSuggestions.map(suggestion => (
                <li
                  key={suggestion}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handlers.onSuggestionClick.bind(null, suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : null}
          {data.searchHistory.length > 0 && data.cardName === '' && flags.isInputFocused ? (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg mt-11 grid gap-2 grid-cols-12 px-2 py-2">
              <p className="col-span-12 text-sm text-gray-500">Recently viewed</p>
              {data.searchHistory.map(card => (
                <li
                  key={card.id}
                  className="cursor-pointer col-span-4"
                  onClick={handlers.onSuggestionClick.bind(null, card.name)}>
                  <MagicCard card={card} shouldDisplayPrice={false} variant="compact" />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Button
          type="submit"
          isLoading={flags.isPending || flags.isPendingSuggestions}
          className="col-span-3 md:col-span-2">
          Search
        </Button>
      </form>
      {data.errorMessage ? <p className="text-sm text-red-400 mt-3">{data.errorMessage}</p> : null}
      {data.cards.length > 0 && !flags.isPending ? (
        <span className="flex items-center text-sm mt-3 gap-1">
          <p className="text-gray-500">
            Search for '{data.query}' returned {data.totalCount} result
            {data.totalCount > 1 ? 's' : ''}
          </p>
          •
          <Button onClick={handlers.onClearSearch} type="button" variant="link">
            clear results
          </Button>
        </span>
      ) : null}
      <CardsList cards={data.cards} isLoading={flags.isPending} />
      {flags.hasMoreResults ? (
        <div className="grid grid-cols-12 md:grid-cols-11 mt-3">
          <Button
            className="col-span-12 sm:col-span-4 sm:col-start-5 md:col-start-5 md:col-span-3"
            isLoading={flags.isLoadingMore || flags.isPending}
            onClick={handlers.onLoadMore}>
            Load more ({`${data.totalCount - data.cards.length}`} left)
          </Button>
        </div>
      ) : null}
    </>
  )
}
