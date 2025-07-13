import { useCardSearch } from "../../hooks";
import { Button, Input, MagicCard } from "../ui";
import { CardsList } from "./CardsList";

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
  } = useCardSearch();

  return (
    <>
      <form
        className="flex gap-3 w-full md:max-w-[400px] mt-3"
        action={handleSearchSubmit.bind(null, cardName)}
      >
        <div className="flex w-full relative">
          <Input
            placeholder="Black Lotus"
            value={cardName}
            onChange={handleSearchChange}
            type="search"
            name="cardName"
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setTimeout(() => setIsInputFocused(false), 100);
            }}
          />
          {nameSuggestions.length > 0 ? (
            <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-lg mt-11 max-h-60 overflow-y-auto">
              {nameSuggestions.map((suggestion) => (
                <li
                  key={suggestion}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleSuggestionClick.bind(null, suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          ) : null}
          {searchHistory.length > 0 && cardName === "" && isInputFocused ? (
            <ul className="absolute z-10 bg-white border border-gray-300 rounded shadow-lg mt-11 grid grid-cols-12">
              <p className="col-span-12 px-4 mt-2 text-sm text-gray-500">
                Recently viewed
              </p>
              {searchHistory.map((card) => (
                <li
                  key={card.id}
                  className="px-4 py-2 cursor-pointer col-span-4"
                  onClick={handleSearchSubmit.bind(null, card.name)}
                >
                  <MagicCard card={card} shouldDisplayName />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <Button type="submit">Search</Button>
      </form>
      {cards.length > 0 ? <CardsList cards={cards} /> : null}
    </>
  );
};

export { SearchForm };
