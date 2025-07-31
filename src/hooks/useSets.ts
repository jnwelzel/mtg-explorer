import { useMemo } from 'react'
import type { Set } from 'scryfall-api'
import { getAllSetsByFirstLetter, getAllStartingLetters, getSetsGroupedByYear } from '../utils'
import { useSearchParams, type SetURLSearchParams } from 'react-router'

type UseSetsResult = {
  allFirstLetters: string[]
  allSetsByFirstLetter: Record<string, Set[]>
  setSearchParams: SetURLSearchParams
  query: string
  allSetsByYear: Record<string, Set[]>
}

export const useSets = (sets: Set[]): UseSetsResult => {
  const allFirstLetters = useMemo(() => {
    return getAllStartingLetters(sets)
  }, [sets])
  const allSetsByFirstLetter = useMemo(() => {
    return getAllSetsByFirstLetter(sets)
  }, [sets])
  const allSetsByYear = useMemo(() => {
    return getSetsGroupedByYear(sets)
  }, [sets])
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams?.get('q') ?? ''

  return { allFirstLetters, allSetsByFirstLetter, setSearchParams, query, allSetsByYear }
}
