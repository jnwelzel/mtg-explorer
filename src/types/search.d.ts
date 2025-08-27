type SortingDirection = 'ascending' | 'descending'
type SortingOrder = 'name' | 'price' | 'cmc' | 'set' | 'rarity' | 'color'

export type SortingValue = 
  'name+ascending' 
  | 'name+descending' 
  | 'price+ascending' 
  | 'price+descending' 
  | 'cmc+ascending' 
  | 'cmc+descending'
  | 'set+ascending'
  | 'set+descending'
  | 'rarity+ascending'
  | 'rarity+descending'
  | 'color+ascending'
  | 'color+descending'
  
export type SortingOption = {
  value: SortingValue
  label: string
}

type UseSortingResult = {
  sortOption: SortingValue
  mapToSortingOption: (value: string) => void
  sortingOptions: SortingOption[]
}

type ScryfallSearchParams = {
  q: string | null
  order: SortingOrder | null
  direction: SortingDirection | null
  o: string[] | null
  e: string | null
  t: string[] | null
  cardName: string[] | null
}
