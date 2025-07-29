import type { Set } from 'scryfall-api'

export const getAllStartingLetters = (sets: Set[]): string[] => {
  return sets
    .reduce((acc, set) => {
      const firstLetter = set.name.charAt(0).toUpperCase()
      if (!acc.includes(firstLetter)) {
        acc.push(firstLetter)
      }
      return acc
    }, [] as string[])
    .sort()
}

export const getAllSetsByFirstLetter = (sets: Set[]): Record<string, Set[]> => {
  return sets.reduce(
    (acc, set) => {
      const firstLetter = set.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(set)
      return acc
    },
    {} as Record<string, Set[]>
  )
}

export const getSetsGroupedByYear = (sets: Set[]): Record<string, Set[]> => {
  return sets.reduce(
    (acc, set) => {
      const key = set?.released_at?.getFullYear() ?? new Date().getFullYear()
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(set)
      return acc
    },
    {} as Record<string, Set[]>
  )
}
