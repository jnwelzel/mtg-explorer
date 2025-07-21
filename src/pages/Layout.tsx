import { Content, Footer, Header, MobileSideNav } from '../components'

import { Outlet } from 'react-router'
import { useApp } from '../hooks'
import { CurrencyContext } from '../contexts'
import React from 'react'

export const Layout: React.FC = () => {
  const { isMenuOpen, setMenuOpen, currency, setCurrency } = useApp()

  return (
    <React.StrictMode>
      <CurrencyContext value={{ currency, setCurrency }}>
        <div className="grid h-screen grid-rows-[auto_1fr_auto]">
          <Header onMenuClick={() => setMenuOpen(!isMenuOpen)} />
          <MobileSideNav isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
          <main className="flex col-span-2 p-4">
            <div className="ml-auto mr-auto max-w-7xl w-full flex-1">
              <Content>
                <h1 className="text-2xl font-bold mb-4">Welcome to MTG Explorer</h1>
                <p className="text-gray-700">
                  Explore your favorite Magic: The Gathering cards and decks.
                </p>
                <Outlet />
              </Content>
            </div>
          </main>
          <Footer />
        </div>
      </CurrencyContext>
    </React.StrictMode>
  )
}
