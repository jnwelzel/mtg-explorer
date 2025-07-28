import { useMemo, useState } from 'react'
import type { Set } from 'scryfall-api'
import { getAllSetsByFirstLetter, getAllStartingLetters } from '../utils'

type UseSetsResult = {
  allFirstLetters: string[]
  allSetsByFirstLetter: Record<string, Set[]>
  currentFirstLetter?: string
  setCurrentFirstLetter: (letter: string) => void
}

export const useSets = (sets: Set[]): UseSetsResult => {
  const allFirstLetters = useMemo(() => {
    return getAllStartingLetters(sets)
  }, [sets])
  const allSetsByFirstLetter = useMemo(() => {
    return getAllSetsByFirstLetter(sets)
  }, [sets])
  const [currentFirstLetter, setCurrentFirstLetter] = useState<string | undefined>(undefined)

  return { allFirstLetters, allSetsByFirstLetter, currentFirstLetter, setCurrentFirstLetter }
}
