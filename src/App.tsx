import { Content, Footer, Header, MobileSideNav } from './components'
import { SearchForm } from './components/SearchForm'

import './App.css'
import { CurrencyContext } from './contexts'
import { useApp } from './hooks'

function App() {
  const { isMenuOpen, setMenuOpen, currency, setCurrency } = useApp()

  return (
    <CurrencyContext value={{ currency, setCurrency }}>
      <div className="grid h-screen app-container">
        <Header onMenuClick={() => setMenuOpen(!isMenuOpen)} />
        <MobileSideNav isOpen={isMenuOpen} onClose={() => setMenuOpen(false)} />
        <main className="flex col-span-2 p-4">
          <div className="ml-auto mr-auto max-w-7xl w-full flex-1">
            <Content>
              <h1 className="text-2xl font-bold mb-4">Welcome to MTG Explorer</h1>
              <p className="text-gray-700">
                Explore your favorite Magic: The Gathering cards and decks.
              </p>
              <SearchForm />
            </Content>
          </div>
        </main>
        <Footer />
      </div>
    </CurrencyContext>
  )
}

export default App
