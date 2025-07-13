import React from "react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => (
  <header className="bg-gray-800 text-white p-4 col-span-2 flex items-center justify-between">
    <span>MTG Explorer</span>
    <button
      className="md:hidden p-2 rounded bg-gray-600"
      onClick={onMenuClick}
      aria-label="Open menu"
    >
      <svg width="24" height="24" fill="none" stroke="currentColor">
        <path
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </header>
);

export { Header };
