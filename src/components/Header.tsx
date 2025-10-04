// src/components/Header.tsx
import React from "react";
import { Link } from "react-router-dom";


const Header: React.FC = () => {
  return (
    <header className="bg-black text-white ">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <Link to="/" className="font-serif text-3xl md:text-4xl font-bold drop-sladow-lg">
           <img src="/img/logo-harry-potter.png" alt="Harry Potter" className="h-10 md:h-12" />
        </Link>
      <nav className="flex gap-4 text-[16px] !text-white">
  <Link
    className="border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300"
    to="/"
  >
    Home
  </Link>
  <Link
    className="border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300"
    to="/characters"
  >
    Personagens
  </Link>
  <Link
    className="border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300"
    to="/spells"
  >
    Feitiços
  </Link>
  <Link
    className="border-b-2 border-transparent hover:border-yellow-400 transition-all duration-300"
    to="/favoritos"
  >
    Favoritos
  </Link>
</nav>

      </div>

    </header>
  );
};

export default Header;
