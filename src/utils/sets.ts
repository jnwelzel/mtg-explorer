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
