import React from 'react'
import { NavItems } from './NavItems'

const SideNav: React.FC = () => (
  <nav className="bg-gray-200 p-4 h-full md:block hidden md:col-span-2">
    <NavItems />
  </nav>
)

export { SideNav }
