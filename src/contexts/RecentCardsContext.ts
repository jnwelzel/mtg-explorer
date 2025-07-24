import { createContext } from 'react'
import type { RecentCardsContextType } from '../types'

export const RecentCardsContext = createContext<RecentCardsContextType>(
  {} as RecentCardsContextType
)
