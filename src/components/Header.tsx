import React from 'react'
import { NavItems } from './NavItems'
import { Link } from 'react-router'

interface HeaderProps {
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => (
  <header className="bg-gray-800 text-white p-4 col-span-2 flex items-center">
    <div className="flex max-w-7xl ml-auto mr-auto w-full items-center">
      <Link to="/">MTG Explorer</Link>
      <nav className="ml-auto">
        <NavItems isVertical={false} className="hidden md:flex" />
        <button
          type="button"
          className="md:hidden p-2 rounded bg-gray-600"
          onClick={onMenuClick}
          aria-label="Open menu">
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
    </div>
  </header>
)

export { Header }
