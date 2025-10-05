// src/components/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white fixed w-full z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="flex items-center">
          <img src="/img/logo-harry-potter.png" alt="Harry Potter" className="h-10 md:h-12" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 text-[16px]">
          <Link className="border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300" to="/">Home</Link>
          <Link className="border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300" to="/characters">Personagens</Link>
          <Link className="border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300" to="/spells">Feitiços</Link>
          <Link className="border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300" to="/favoritos">Favoritos</Link>
        </nav>

        {/* Mobile Hamburger */}
    
<button
  className="md:hidden flex flex-col justify-center items-center w-10 h-10 !bg-yellow-400 rounded-lg border border-yellow-500 p-2"
  onClick={() => setMenuOpen(!menuOpen)}
>
  <span
    className={`block w-6 h-1 bg-black mb-1 transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
  ></span>
  <span
    className={`block w-6 h-1 bg-black mb-1 transition-opacity duration-300 ${menuOpen ? "opacity-0" : "opacity-100"}`}
  ></span>
  <span
    className={`block w-6 h-1 bg-black transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
  ></span>
</button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden !bg-black text-white w-full absolute left-0 top-full flex flex-col items-center gap-4 py-4 border-t border-yellow-400">
          <Link onClick={() => setMenuOpen(false)} className="hover:text-yellow-400 transition-colors" to="/">Home</Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-yellow-400 transition-colors" to="/characters">Personagens</Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-yellow-400 transition-colors" to="/spells">Feitiços</Link>
          <Link onClick={() => setMenuOpen(false)} className="hover:text-yellow-400 transition-colors" to="/favoritos">Favoritos</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
