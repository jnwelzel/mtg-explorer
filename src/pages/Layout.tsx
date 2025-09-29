import { Footer, Header, MobileSideNav } from '../components'

import { Outlet } from 'react-router'
import { useApp } from '../hooks'
import { CurrencyContext, RecentCardsContext } from '../contexts'
import React, { useMemo } from 'react'

export const Layout: React.FC = () => {
  const {
    isMenuOpen,
    setMenuOpen,
    currency,
    setCurrency,
    recentlyViewedCards,
    addRecentlyViewedCard,
  } = useApp()

  // Memoize the context values so they don't change every render
  const currencyContextValue = useMemo(() => ({ currency, setCurrency }), [currency, setCurrency])
  const recentCardsContextValue = useMemo(
    () => ({ recentlyViewedCards, addRecentlyViewedCard }),
    [recentlyViewedCards, addRecentlyViewedCard]
  )

  return (
    <React.StrictMode>
      <CurrencyContext value={currencyContextValue}>
        <RecentCardsContext value={recentCardsContextValue}>
          <div className="grid min-h-screen grid-rows-[auto_1fr_auto] bg-white">
            <Header onMenuClick={() => setMenuOpen(!isMenuOpen)} />
            <MobileSideNav isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
            <main className="p-4 overflow-x-auto">
              <div className="container mx-auto">
                <Outlet />
              </div>
            </main>
            <Footer />
          </div>
        </RecentCardsContext>
      </CurrencyContext>
    </React.StrictMode>
  )
}
