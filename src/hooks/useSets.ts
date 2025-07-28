import { useMemo } from 'react'
import type { Set } from 'scryfall-api'
import { getAllSetsByFirstLetter, getAllStartingLetters } from '../utils'
import { useSearchParams } from 'react-router'

type UseSetsResult = {
  allFirstLetters: string[]
  allSetsByFirstLetter: Record<string, Set[]>
  setSearchParams: (letter: string) => void
  query: string | null
}

export const useSets = (sets: Set[]): UseSetsResult => {
  const allFirstLetters = useMemo(() => {
    return getAllStartingLetters(sets)
  }, [sets])
  const allSetsByFirstLetter = useMemo(() => {
    return getAllSetsByFirstLetter(sets)
  }, [sets])
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')

  return { allFirstLetters, allSetsByFirstLetter, setSearchParams, query }
}
