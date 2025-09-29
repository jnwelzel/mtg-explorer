import { useEffect, useState } from 'react'
import type { Set } from 'scryfall-api'
import type { SortingDirection } from '../types/search'

type UseSetsResult = {
  pages: Record<number, Set[]>
  currentPage: number
  setCurrentPage: (page: number) => void
  pageSize: 10 | 20 | 50 | 100
  setPageSize: (size: 10 | 20 | 50 | 100) => void
  sortDirection: SortingDirection
  currentSorting: SortingOption
  handleSortingClick: (sortingOption: SortingOption) => void
}

type SortingOption = 'name' | 'date' | 'type' | 'cards'

const sortSets = (sets: Set[], option: SortingOption, direction: SortingDirection): Set[] => {
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

const buildPages = (sets: Set[], pageSize: number): Record<number, Set[]> => {
  const pageCount = Math.ceil(sets.length / pageSize)
  const pages: Record<number, Set[]> = {}
  for (let i = 0; i < pageCount; i++) {
    pages[i + 1] = sets.slice(i * pageSize, (i + 1) * pageSize)
  }
  return pages
}

export const useSets = (sets: Set[]): UseSetsResult => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState<10 | 20 | 50 | 100>(20)
  const [pages, setPages] = useState<Record<number, Set[]>>(() => buildPages(sets, pageSize))
  const [currentSorting, setCurrentSorting] = useState<SortingOption>('date')
  const [sortDirection, setSortDirection] = useState<SortingDirection>('descending')

  useEffect(() => {
    setCurrentPage(1)
  }, [pageSize])

  const handleSortingClick = (sortingOption: SortingOption) => {
    let newSortDirection: SortingDirection = 'ascending'
    if (currentSorting === sortingOption) {
      newSortDirection = sortDirection === 'ascending' ? 'descending' : 'ascending'
      setSortDirection(newSortDirection)
    } else {
      setCurrentSorting(sortingOption)
      setSortDirection(newSortDirection)
    }
    setPages(buildPages(sortSets(sets, sortingOption, newSortDirection), pageSize))
  }

  return {
    pages,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    sortDirection,
    currentSorting,
    handleSortingClick,
  }
}
