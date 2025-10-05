// src/pages/HPSpells.tsx
import React, { useEffect, useState } from "react";
import { getSpells } from "../services/spells";
import type { Spell } from "../types/spell";

export default function HPSpells() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modalSpell, setModalSpell] = useState<Spell | null>(null);

  useEffect(() => {
    getSpells()
      .then(setSpells)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const spellsFiltrados = spells.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-screen h-full w-full flex flex-col justify-center items-center bg-black text-white font-serif">
        <img
          src="/img/logo-harry-potter.png"
          alt="Carregando..."
          className="w-24 h-24 mb-4 animate-spin"
        />
        <p className="text-lg">Carregando feitiços...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-screen bg-black py-[120px]">
    <div className="container">
      <h1 className="text-4xl font-harry mb-6 text-center text-yellow-400 drop-shadow-lg">
        Feitiços do Mundo Mágico
      </h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Pesquisar feitiço..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-lg w-full md:w-1/3 border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 bg-gray-900 text-white placeholder-yellow-300"
        />
      </div>

      {spellsFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {spellsFiltrados.map((spell, index) => (
            <div
              key={index}
              className="bg-black bg-opacity-70 backdrop-blur-md p-4 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.5)] hover:shadow-[0_0_40px_rgba(255,215,0,0.7)] hover:scale-105 transform transition cursor-pointer border-2 border-yellow-400"
              onClick={() => setModalSpell(spell)}
            >
              <h3 className="text-xl font-bold mb-2 text-yellow-400 font-harry">{spell.name}</h3>
              {spell.incantation && (
                <p className="text-sm mb-1 text-gray-200">
                  <span className="font-semibold text-yellow-400">Incantation:</span> {spell.incantation}
                </p>
              )}
              {spell.type && (
                <p className="text-sm mb-1 text-gray-200">
                  <span className="font-semibold text-yellow-400">Tipo:</span> {spell.type}
                </p>
              )}
              {spell.description && (
                <p className="text-gray-300 text-sm truncate">{spell.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">Nenhum feitiço encontrado.</p>
      )}

      {modalSpell && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 relative shadow-[0_0_50px_rgba(255,215,0,0.7)]">
            <button
              className="absolute top-2 right-2 text-yellow-400 text-3xl border-none hover:bg-yellow-300 hover:text-black rounded-lg px-2"
              onClick={() => setModalSpell(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400 font-harry">{modalSpell.name}</h2>
            {modalSpell.incantation && (
              <p className="mb-2 text-gray-200">
                <span className="font-semibold text-yellow-400">Incantation:</span> {modalSpell.incantation}
              </p>
            )}
            {modalSpell.type && (
              <p className="mb-2 text-gray-200">
                <span className="font-semibold text-yellow-400">Tipo:</span> {modalSpell.type}
              </p>
            )}
            {modalSpell.description && (
              <p className="text-gray-200">{modalSpell.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
