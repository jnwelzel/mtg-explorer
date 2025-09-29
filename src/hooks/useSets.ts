import { useEffect, useState } from 'react'
import type { Set } from 'scryfall-api'
import type { SortingDirection } from '../types/search'
import { buildPages, sortSets } from '../utils'
import type { SetSortingOption } from '../types'

type UseSetsResult = {
  pages: Record<number, Set[]>
  currentPage: number
  setCurrentPage: (page: number) => void
  pageSize: 10 | 20 | 50 | 100
  setPageSize: (size: 10 | 20 | 50 | 100) => void
  sortDirection: SortingDirection
  currentSorting: SetSortingOption
  handleSortingClick: (sortingOption: SetSortingOption) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  onSearchSubmit: () => void
}

export const useSets = (sets: Set[]): UseSetsResult => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState<10 | 20 | 50 | 100>(20)
  const [pages, setPages] = useState<Record<number, Set[]>>(() => buildPages(sets, pageSize))
  const [currentSorting, setCurrentSorting] = useState<SetSortingOption>('date')
  const [sortDirection, setSortDirection] = useState<SortingDirection>('descending')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    setCurrentPage(1)
    setCurrentSorting('date')
    setSortDirection('descending')
    setSearchTerm('')
    setPages(buildPages(sortSets(sets, 'date', 'descending'), pageSize))
  }, [pageSize, sets])

  const handleSortingClick = (sortingOption: SetSortingOption) => {
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

  const onSearchSubmit = () => {
    const filteredSets = sets.filter(set =>
      set.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setCurrentPage(1)
    setPages(buildPages(sortSets(filteredSets, currentSorting, sortDirection), pageSize))
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
    searchTerm,
    setSearchTerm,
    onSearchSubmit,
  }
}
