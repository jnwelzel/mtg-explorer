import { use } from 'react'
import { useSearchForm } from '../../hooks'
import { Button, Input } from '../ui'
import { CardsList } from './CardsList'
import { RecentCardsContext } from '../../contexts'
import { SuggestionsList } from './SuggestionsList'
import { RecentlyViewedList } from './RecentlyViewedList'

export const SearchForm: React.FC = () => {
  const { handlers, data, flags } = useSearchForm()
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
      <CardsList
        cards={data.cards}
        isLoading={flags.isPending}
        zoomLevel={data.zoomLevel}
        totalCount={data.totalCount}
        onLoadMore={handlers.onLoadMore}
        isLoadingMore={flags.isLoadingMore || flags.isPending}
        hasMoreResults={flags.hasMoreResults ?? false}
        query={data.query}
        onClearSearch={handlers.onClearSearch}
        onZoomInClick={() => handlers.onZoomClick('zoomIn')}
        onZoomOutClick={() => handlers.onZoomClick('zoomOut')}
        isMaxZoom={flags.isMaxZoom}
        isMinZoom={flags.isMinZoom}
        errorMessage={data.errorMessage}
        sortOption={data.sortOption}
        mapToSortingOption={handlers.mapToSortingOption}
        sortingOptions={data.sortingOptions}
      />
    </>
  )
}
