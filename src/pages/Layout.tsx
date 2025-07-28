import { Content, Footer, Header, MobileSideNav } from '../components'

import { Outlet } from 'react-router'
import { useApp } from '../hooks'
import { CurrencyContext, RecentCardsContext } from '../contexts'
import React from 'react'

export const Layout: React.FC = () => {
  const {
    isMenuOpen,
    setMenuOpen,
    currency,
    setCurrency,
    recentlyViewedCards,
    addRecentlyViewedCard,
  } = useApp()
  const currencyContextValue = React.useMemo(
    () => ({ currency, setCurrency }),
    [currency, setCurrency]
  )
  const recentCardsContextValue = React.useMemo(
    () => ({ recentlyViewedCards, addRecentlyViewedCard }),
    [recentlyViewedCards, addRecentlyViewedCard]
  )

  return (
    <React.StrictMode>
      <CurrencyContext value={currencyContextValue}>
        <RecentCardsContext value={recentCardsContextValue}>
          <div className="grid h-screen grid-rows-[auto_1fr_auto]">
            <Header onMenuClick={() => setMenuOpen(!isMenuOpen)} />
            <MobileSideNav isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
            <main className="flex col-span-2 p-4">
              <div className="ml-auto mr-auto max-w-7xl w-full flex-1">
                <Content>
                  <Outlet />
                </Content>
              </div>
            </main>
            <Footer />
          </div>
        </RecentCardsContext>
      </CurrencyContext>
    </React.StrictMode>
  )
}
