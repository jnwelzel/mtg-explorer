import type { Set, SetType } from 'scryfall-api'
import type { SortingDirection } from '../types/search'
import type { SetSortingOption } from '../types'

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

export const getTypeLabel = (type: SetType | null): string => {
  switch (type) {
    case 'alchemy':
      return 'Alchemy'
    case 'archenemy':
      return 'Archenemy'
    case 'arsenal':
      return 'Arsenal'
    case 'box':
      return 'Box'
    case 'commander':
      return 'Commander'
    case 'core':
      return 'Core'
    case 'draft_innovation':
      return 'Draft Innovation'
    case 'duel_deck':
      return 'Duel Deck'
    case 'expansion':
      return 'Expansion'
    case 'from_the_vault':
      return 'From the Vault'
    case 'funny':
      return 'Funny'
    case 'masterpiece':
      return 'Masterpiece'
    case 'masters':
      return 'Masters'
    case 'memorabilia':
      return 'Memorabilia'
    case 'minigame':
      return 'Minigame'
    case 'planechase':
      return 'Planechase'
    case 'premium_deck':
      return 'Premium Deck'
    case 'promo':
      return 'Promo'
    case 'spellbook':
      return 'Spellbook'
    case 'starter':
      return 'Starter'
    case 'token':
      return 'Token'
    case 'treasure_chest':
      return 'Treasure Chest'
    case 'vanguard':
      return 'Vanguard'
    case null:
      return 'Unknown'
    default:
      return 'Unknown'
  }
}
