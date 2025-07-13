import { useState } from "react";
import { Content, Footer, Header, MobileSideNav, SideNav } from "./components";
import { SearchForm } from "./components/SearchForm";

import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="grid h-screen app-container">
      <Header onMenuClick={() => setMenuOpen(!menuOpen)} />
      <MobileSideNav open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="grid grid-cols-1 md:grid-cols-12 col-span-2">
        <SideNav />
        <Content>
          <h1 className="text-2xl font-bold mb-4">Welcome to MTG Explorer</h1>
          <p className="text-gray-700">
            Explore your favorite Magic: The Gathering cards and decks.
          </p>
          <SearchForm />
        </Content>
      </div>
      <Footer />
    </div>
  );
}

export default App;
