import type { ScryfallSearchParams } from '../types'
import type { SortingDirection, SortingOrder } from '../types/search'

export const getParams = (query: URLSearchParams): ScryfallSearchParams | null => {
  const q = query.get('q') || ''

  if (!q) return null

  return {
    q,
    cardName: extractCardName(q),
    order: getOrder(q),
    direction: getDirection(q),
    o: extractMultipleValues(q, 'o:'),
    e: extractMultipleValues(q, 'e:') ? extractMultipleValues(q, 'e:')![0] : null,
    t: extractMultipleValues(q, 't:'),
  }
}

export const getOrder = (query: string): SortingOrder | null => {
  const regex = /order:(name|price|cmc|set|rarity|color)/
  const hasOrder = regex.test(query)
  if (!hasOrder) return null

  const match = query.match(regex)
  return match ? (match[1] as SortingOrder) : null
}

export const getDirection = (query: string): SortingDirection | null => {
  const regex = /direction:(ascending|descending)/
  const hasDirection = regex.test(query)
  if (!hasDirection) return null

  const match = query.match(regex)
  return match ? (match[1] as SortingDirection) : null
}

export const extractMultipleValues = (query: string, prefix: string): string[] | null => {
  const values = query
    .split(' ')
    .filter(part => part.startsWith(prefix))
    .map(part => part.substring(prefix.length))

  return values.length > 0 ? values : null
}

export const extractCardName = (query: string): string[] | null => {
  if (!query) return null

  // Split into tokens
  const parts = query.trim().split(/\s+/)

  const cardName = []
  let collecting = false

  for (const part of parts) {
    if (!part.includes(':')) {
      // Found start of card name
      collecting = true
      cardName.push(part)
    } else if (collecting) {
      // Stop once we hit the first key:value pair after starting
      break
    }
  }

  return cardName.length > 0 ? cardName : null
}
