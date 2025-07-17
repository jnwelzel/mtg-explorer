import React from 'react'
import { NavItems } from './NavItems'

interface MobileSideNavProps {
  isOpen: boolean
  onClose: () => void
}

const MobileSideNav: React.FC<MobileSideNavProps> = ({ isOpen, onClose }) =>
  isOpen ? (
    <aside className="fixed inset-0 z-50 md:hidden">
      <div
        className={`absolute top-0 left-0 h-full w-full bg-gray-800 text-white p-4 shadow-lg flex flex-col
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ willChange: 'transform' }}>
        <button
          className="self-end mb-4 w-10 h-10 flex justify-center items-center rounded bg-gray-600"
          onClick={onClose}
          aria-label="Close menu">
          ✕
        </button>
        <NavItems />
      </div>
    </aside>
  ) : null

export { MobileSideNav }
