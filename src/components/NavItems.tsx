import React, { useContext } from 'react'
import { CurrencyContext } from '../contexts'
import type { Currency } from '../contexts/CurrencyContext'

type NavItemsProps = {
  isVertical?: boolean
  className?: string
}

const NavItems: React.FC<NavItemsProps> = ({ isVertical = true, className = '' }) => {
  const { currency, setCurrency } = useContext(CurrencyContext)

  return (
    <ul
      className={`${
        isVertical ? 'flex flex-col gap-2' : 'flex flex-row gap-6 items-center'
      } ${className}`}>
      <li>Cards</li>
      <li>Decks</li>
      <li>Sets</li>
      <li>News</li>
      <li>Utilities</li>
      <li>Sign up</li>
      <li className="flex items-center">
        <label className="mr-2" htmlFor="currency-select">
          Prices
        </label>
        <select
          id="currency-select"
          className="border rounded px-2 py-1"
          value={currency}
          onChange={e => setCurrency(e.target.value as Currency)}>
          <option value="eur">EUR</option>
          <option value="usd">USD</option>
          <option value="tix">TIX</option>
        </select>
      </li>
    </ul>
  )
}

export { NavItems }
