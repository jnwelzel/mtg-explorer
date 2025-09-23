import { useNavigate } from 'react-router'
import { routesPath } from '../routes'
import { useState } from 'react'

type UseHomePageResult = {
  cardName: string
  setCardName: (name: string) => void
  handleSearchSubmit: () => void
}

export const useHomePage = (): UseHomePageResult => {
  const navigate = useNavigate()
  const [cardName, setCardName] = useState<string>('')

  const handleSearchSubmit = () => {
    if (cardName.trim()) {
      const url = routesPath.cards + '?' + new URLSearchParams({ q: cardName }).toString()
      navigate(url)
    }
  }

  return {
    cardName,
    setCardName,
    handleSearchSubmit,
  }
}
