import { use } from 'react'
import { useSearchForm } from '../../hooks'
import { Button, CardsListContainer, Input } from '../ui'
import { RecentCardsContext } from '../../contexts'
import { SuggestionsList } from './SuggestionsList'
import { RecentlyViewedList } from './RecentlyViewedList'
import { AdvancedSearch } from '../AdvancedSearch'
import { SyntaxGuide } from '../SyntaxGuide'

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
            placeholder="Enter a card name"
            value={data.cardName}
            onChange={handlers.onSearchChange}
            type="search"
            name="cardName"
            onFocus={() => {
              handlers.setIsInputFocused(true)
            }}
            onBlur={() => {
              setTimeout(() => handlers.setIsInputFocused(false), 100)
              handlers.setIsRecentlyViewedFocused(false)
            }}
            onKeyDown={handlers.onSearchKeyDown}
          />
          {data.nameSuggestions.length > 0 &&
          (flags.isInputFocused || flags.isSuggestionsFocused) ? (
            <SuggestionsList
              suggestions={data.nameSuggestions}
              onSuggestionClick={handlers.onSuggestionClick}
              onFocus={() => {
                handlers.setIsSuggestionsFocused(true)
              }}
              onBlur={() => {
                setTimeout(() => handlers.setIsSuggestionsFocused(false), 100)
              }}
            />
          ) : null}
          {recentlyViewedCards.length > 0 &&
          data.cardName === '' &&
          (flags.isInputFocused || flags.isRecentlyViewedFocused) ? (
            <RecentlyViewedList
              recentlyViewedCards={recentlyViewedCards}
              onCardClick={handlers.onSuggestionClick}
              onFocus={() => {
                handlers.setIsRecentlyViewedFocused(true)
              }}
              onBlur={() => {
                setTimeout(() => handlers.setIsRecentlyViewedFocused(false), 100)
              }}
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
      <div className="flex gap-1">
        <AdvancedSearch className="inline" /> <span className="text-gray-500">•</span>{' '}
        <SyntaxGuide />
      </div>
      <CardsListContainer onClearSearchCallback={handlers.onClearSearchCallback} />
    </>
  )
}
