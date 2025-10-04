// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HPCharacter from "./pages/HPCharacter";
import HPCharacterDetail from "./pages/HPCharacterDetail";
import HSpells from "./pages/HSpells";
import Favoritos from "./pages/Favoritos";
import Home from "./pages/Home";
import { FavoritoProvider } from "./contexts/PersonagemFavoritoContext";
import Header from "./components/Header";
import Footer from "./components/Footer";


function App() {
  return (
    <FavoritoProvider>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Conteúdo principal */}
        <main className="flex">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/characters" element={<HPCharacter />} />
            <Route path="/characters/:id" element={<HPCharacterDetail />} />
            <Route path="/spells" element={<HSpells />} />
            <Route path="/favoritos" element={<Favoritos />} />
            <Route
              path="*"
              element={
                <h1 className="text-3xl font-bold text-red-600 text-center mt-10">
                  Página não encontrada
                </h1>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </FavoritoProvider>
  );
}

export default App;
