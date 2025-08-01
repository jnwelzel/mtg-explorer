import React, { use } from 'react'
import { CurrencyContext } from '../contexts'
import type { Currency } from '../types'
import { NavLink } from 'react-router'

interface NavItemsProps {
  isVertical?: boolean
  className?: string
  onClick?: () => void
}

const NavItems: React.FC<NavItemsProps> = ({ isVertical = true, className = '', onClick }) => {
  const { currency, setCurrency } = use(CurrencyContext)

  return (
    <ul
      className={`${
        isVertical ? 'flex flex-col gap-2' : 'flex flex-row gap-6 items-center'
      } ${className}`}>
      <li>
        <NavLink
          to="/cards"
          className={({ isActive }) => (isActive ? 'text-purple-300 underline' : '')}
          onClick={onClick}>
          Cards
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/sets"
          className={({ isActive }) => (isActive ? 'text-purple-300 underline' : '')}
          onClick={onClick}>
          Sets
        </NavLink>
      </li>
      <li>Decks</li>
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
