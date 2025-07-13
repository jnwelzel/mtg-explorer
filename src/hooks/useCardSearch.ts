import { useState, useEffect, useTransition } from "react";
import { Cards, type Card } from "scryfall-api";
import { useDebounce } from "./useDebounce";
import { useCardSearchHistory } from "./useCardSearchHistory";

export type UseCardSearchResult = {
  cards: Card[];
  cardName: string;
  nameSuggestions: string[];
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (suggestion?: string) => Promise<void>;
  handleSuggestionClick: (suggestion: string) => void;
  searchHistory: Card[];
  isInputFocused: boolean;
  setIsInputFocused: (focused: boolean) => void;
  isPending: boolean;
};

const useCardSearch = (): UseCardSearchResult => {
  const [cards, setCards] = useState<Card[]>([]);
  const [cardName, setCardName] = useState("");
  const debouncedQuery = useDebounce(cardName, 400);
  const [nameSuggestions, setNameSuggestions] = useState<string[]>([]);
  const { searchHistory, addCardToHistory } = useCardSearchHistory(
    localStorage.getItem("cardSearchHistory")
      ? JSON.parse(localStorage.getItem("cardSearchHistory")!)
      : []
  );
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (debouncedQuery) {
      if (debouncedQuery.trim() === "") {
        setCards([]);
        return;
      }
      const fetchSuggestions = async () => {
        const suggestions = await Cards.autoCompleteName(debouncedQuery);
        if (suggestions.length > 0 && suggestions[0] !== debouncedQuery) {
          setNameSuggestions(suggestions);
        } else {
          setNameSuggestions([]);
        }
      };
      fetchSuggestions();
    }
  }, [debouncedQuery]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(event.target.value);
    if (event.target.value.trim() === "") {
      setCards([]);
      setNameSuggestions([]);
    }
  };

  const handleSearchSubmit = async (suggestion?: string) => {
    startTransition(async () => {
      const card = await Cards.byName(suggestion || cardName, true);
      if (!card) {
        setCards([]);
        return;
      }
      // If a suggestion is provided, set the card name to that suggestion
      if (suggestion) {
        setCardName(suggestion);
      }
      // Clear suggestions if a card is found
      setNameSuggestions([]);
      // Set the found card
      setCards([card]);
      // Add the found card to the cards history
      addCardToHistory(card);
    });
  };

  const handleSuggestionClick = (suggestion: string): void => {
    setCardName(suggestion);
    setNameSuggestions([]);
    handleSearchSubmit(suggestion);
  };

  return {
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
  };
};

export { useCardSearch };
