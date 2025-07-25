interface SuggestionsListProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  onSuggestionClick,
}) => {
  return (
    <ul className="absolute z-20 w-full bg-white border border-gray-300 rounded shadow-lg mt-11 max-h-60 overflow-y-auto">
      {suggestions.map(suggestion => (
        <li
          key={suggestion}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={onSuggestionClick.bind(null, suggestion)}>
          {suggestion}
        </li>
      ))}
    </ul>
  )
}
