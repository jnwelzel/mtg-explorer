import { use } from 'react'
import { useSearchForm } from '../../hooks'
import { Button, Input } from '../ui'
import { CardsListContainer } from './CardsList'
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
          {data.nameSuggestions.length > 0 && flags.isInputFocused ? (
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
          isLoading={flags.isPendingSuggestions}
          className="col-span-3 md:col-span-2">
          Search
        </Button>
      </form>
      <CardsListContainer />
    </>
  )
}
