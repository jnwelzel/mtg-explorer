import { use } from 'react'
import { useCardSearch } from '../../hooks'
import { Button, Input, Message } from '../ui'
import { CardsList } from './CardsList'
import { RecentCardsContext } from '../../contexts'
import { ResultsInfo } from './ResultsInfo'
import { SuggestionsList } from './SuggestionsList'
import { RecentlyViewedList } from './RecentlyViewedList'

export const SearchForm: React.FC = () => {
  const { handlers, data, flags } = useCardSearch()
  const { recentlyViewedCards } = use(RecentCardsContext)

  return (
    <>
      <form
        className="grid gap-3 w-full mt-3 grid-cols-12"
        action={handlers.onSearchSubmit.bind(null, undefined)}>
        <div className="flex w-full relative col-span-9 md:col-span-4">
          <Input
            ref={data.searchInputRef}
            inputMode="search"
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
            <SuggestionsList
              suggestions={data.nameSuggestions}
              onSuggestionClick={handlers.onSuggestionClick}
            />
          ) : null}
          {recentlyViewedCards.length > 0 && data.cardName === '' && flags.isInputFocused ? (
            <RecentlyViewedList
              recentlyViewedCards={recentlyViewedCards}
              onCardClick={handlers.onSuggestionClick}
            />
          ) : null}
        </div>

        <Button
          type="submit"
          isLoading={flags.isPending || flags.isPendingSuggestions}
          className="col-span-3 md:col-span-2">
          Search
        </Button>
      </form>
      {data.errorMessage ? (
        <Message message={data.errorMessage} variant="error" className="mt-3" />
      ) : null}
      <ResultsInfo
        query={data.query}
        totalCount={data.totalCount}
        onClearSearch={handlers.onClearSearch}
        isLoading={flags.isPending}
      />
      <CardsList cards={data.cards} isLoading={flags.isPending} />
      {flags.hasMoreResults ? (
        <div className="grid grid-cols-12 md:grid-cols-11 mt-3">
          <Button
            className="col-start-4 col-span-6 sm:col-span-4 sm:col-start-5 md:col-start-5 md:col-span-3"
            isLoading={flags.isLoadingMore || flags.isPending}
            onClick={handlers.onLoadMore}>
            Load more ({`${data.totalCount - data.cards.length}`} left)
          </Button>
        </div>
      ) : null}
    </>
  )
}
