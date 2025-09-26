import { useEffect, useMemo, useState } from 'react'
import type { Set } from 'scryfall-api'

type UseSetsResult = {
  pages: Record<number, Set[]>
  currentPage: number
  setCurrentPage: (page: number) => void
  pageSize: 10 | 20 | 50 | 100
  setPageSize: (size: 10 | 20 | 50 | 100) => void
}

export const useSets = (sets: Set[]): UseSetsResult => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState<10 | 20 | 50 | 100>(20)
  const pages = useMemo<Record<number, Set[]>>(() => {
    const pageCount = Math.ceil(sets.length / pageSize)
    return Array.from({ length: pageCount }, (_, i) => sets.slice(i * pageSize, (i + 1) * pageSize))
  }, [sets, pageSize])

  useEffect(() => {
    setCurrentPage(1)
  }, [pageSize])

  return { pages, currentPage, setCurrentPage, pageSize, setPageSize }
}
