interface SuggestionsListProps {
  suggestions: string[]
  onSuggestionClick: (suggestion: string) => void
  onFocus?: () => void
  onBlur?: () => void
}

export const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  onSuggestionClick,
  onFocus,
  onBlur,
}) => {
  return (
    <ul
      role="listbox"
      className="absolute z-20 w-full bg-white border border-gray-300 rounded shadow-lg mt-11 max-h-60 overflow-y-auto overscroll-contain"
      onFocus={onFocus}
      onBlur={e => {
        if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
          // Focus is still inside the list, do nothing
          return
        }
        onBlur?.()
      }}>
      {suggestions.map(suggestion => (
        <li
          role="option"
          aria-label={suggestion}
          key={suggestion}
          className="suggestion-item px-4 py-2 hover:bg-gray-100 cursor-pointer focus:bg-gray-100"
          onClick={onSuggestionClick.bind(null, suggestion)}
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              onSuggestionClick(suggestion)
            }
          }}>
          {suggestion}
        </li>
      ))}
    </ul>
  )
}
