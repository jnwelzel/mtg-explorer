import { use, useEffect, useState, useCallback, useMemo } from 'react'
import type { SortingOption, SortingValue, UseSortingResult } from '../types/search'
import { useSearchParams } from 'react-router'
import { CurrencyContext } from '../contexts'

export const useSorting = (): UseSortingResult => {
  const [sortOption, setSortOption] = useState<SortingValue>('name+ascending')
  const [searchParams, setSearchParams] = useSearchParams()
  const { currency } = use(CurrencyContext)
  const sortingOptions: SortingOption[] = useMemo<SortingOption[]>(
    () => [
      { value: 'name+ascending', label: 'Name (A-Z)' },
      { value: 'name+descending', label: 'Name (Z-A)' },
      { value: 'price+ascending', label: 'Price (Low to High)' },
      { value: 'price+descending', label: 'Price (High to Low)' },
      { value: 'cmc+ascending', label: 'CMC (Low to High)' },
      { value: 'cmc+descending', label: 'CMC (High to Low)' },
      { value: 'set+ascending', label: 'Set (A-Z)' },
      { value: 'set+descending', label: 'Set (Z-A)' },
      { value: 'rarity+ascending', label: 'Rarity (ascending)' },
      { value: 'rarity+descending', label: 'Rarity (descending)' },
      { value: 'color+ascending', label: 'Color (A-Z)' },
      { value: 'color+descending', label: 'Color (Z-A)' },
    ],
    []
  )

  useEffect(() => {
    const query = searchParams.get('q') || ''
    if (!query) return

    const matches = query.match(/order:([a-z]+)(?:\s+direction:(ascending|descending))?/)
    const order = matches?.[1] || null
    const direction = matches?.[2] || null

    if (order && direction) {
      setSortOption(`${order}+${direction}` as SortingValue)
    } else {
      setSortOption('name+ascending')
    }
  }, [searchParams])

  const handleSortChange = useCallback(
    (newSortOption: SortingOption) => {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev)
        const query = prev.get('q') || ''
        const [order, direction] = newSortOption.value.split('+')
        const hasOrder = /order:[a-z]+/.test(query)
        const hasDirection = /direction:(ascending|descending)/.test(query)

        if (hasOrder && hasDirection) {
          let updatedQuery = query.replace(
            /order:[a-z]+/,
            `order:${order === 'price' ? currency : order}`
          )
          updatedQuery = updatedQuery.replace(
            /direction:(ascending|descending)/,
            `direction:${direction}`
          )
          newParams.set('q', updatedQuery)
        } else {
          newParams.set(
            'q',
            `${query} order:${order === 'price' ? currency : order} direction:${direction}`
          )
        }

        return newParams
      })
      console.log(`Sorting changed to: ${newSortOption.value}`)
    },
    [setSearchParams, currency]
  )

  const mapToSortingOption = useCallback(
    (value: string) => {
      const selectedOption = sortingOptions.find(option => option.value === value)
      if (selectedOption) {
        handleSortChange(selectedOption)
      }
    },
    [sortingOptions, handleSortChange]
  )

  return {
    sortOption,
    mapToSortingOption,
    sortingOptions,
  }
}
