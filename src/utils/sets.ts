import type { Set } from 'scryfall-api'
import type { SortingDirection } from '../types/search'

export const sortSets = (
  sets: Set[],
  option: SetSortingOption,
  direction: SortingDirection
): Set[] => {
  const sorted = [...sets].sort((a, b) => {
    let compareA: string | number = ''
    let compareB: string | number = ''

    switch (option) {
      case 'name':
        compareA = a.name
        compareB = b.name
        break
      case 'date':
        compareA = a.released_at ? new Date(a.released_at).getTime() : 0
        compareB = b.released_at ? new Date(b.released_at).getTime() : 0
        break
      case 'type':
        compareA = a.set_type || ''
        compareB = b.set_type || ''
        break
      case 'cards':
        compareA = a.card_count || 0
        compareB = b.card_count || 0
        break
    }

    if (compareA < compareB) return direction === 'ascending' ? -1 : 1
    if (compareA > compareB) return direction === 'ascending' ? 1 : -1
    return 0
  })

  return sorted
}

export const buildPages = (sets: Set[], pageSize: number): Record<number, Set[]> => {
  const pageCount = Math.ceil(sets.length / pageSize)
  const pages: Record<number, Set[]> = {}
  for (let i = 0; i < pageCount; i++) {
    pages[i + 1] = sets.slice(i * pageSize, (i + 1) * pageSize)
  }
  return pages
}
