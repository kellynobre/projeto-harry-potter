// src/pages/HPCharacter.tsx
import React, { useEffect, useState } from "react";
import { getCharacters } from "../services/character";
import type { Character } from "../types/character";
import { CardPersonagem } from "../components/CardPersonagem";
import { useNavigate } from "react-router-dom";

export default function HPCharacter() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filtroCasa, setFiltroCasa] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroVivo, setFiltroVivo] = useState("");
  const [searchNome, setSearchNome] = useState("");

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const limit = 12;

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getCharacters(page, limit)
      .then((data) => {
        setCharacters(data);
        setHasNextPage(data.length === limit); 
      })
      .catch((err) => {
        console.error(err);
        setError("Falha ao carregar personagens.");
      })
      .finally(() => setLoading(false));
  }, [page]);

  const especiesUnicas = Array.from(
    new Set(characters.map((c) => c.species).filter(Boolean))
  );

  const personagensFiltrados = characters.filter(
    (c) =>
      (!filtroCasa || (c.house && c.house === filtroCasa)) &&
      (!filtroEspecie || (c.species && c.species === filtroEspecie)) &&
      (!filtroVivo || (filtroVivo === "alive" ? c.alive : !c.alive)) &&
      (!searchNome || c.name.toLowerCase().includes(searchNome.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white">
        <img
          src="/img/logo-harry-potter.png"
          alt="Carregando..."
          className="w-24 h-24 mb-4 animate-spin"
        />
        <p className="text-lg">Carregando personagens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-[120px] w-full text-white">
      <div className="container py-6">
        <h1 className="text-4xl md:text-5xl font-harry mb-8 text-center text-yellow-400 drop-shadow-lg">
          Personagens de Harry Potter
        </h1>

        {/* FILTROS */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center flex-wrap">
          {/* Casa */}
          <div className="relative w-60">
            <select
              value={filtroCasa}
              onChange={(e) => setFiltroCasa(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-900 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none cursor-pointer"
            >
              <option value="">Todas casas</option>
              <option value="Gryffindor">Gryffindor</option>
              <option value="Slytherin">Slytherin</option>
              <option value="Hufflepuff">Hufflepuff</option>
              <option value="Ravenclaw">Ravenclaw</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Espécie */}
          <div className="relative w-60">
            <select
              value={filtroEspecie}
              onChange={(e) => setFiltroEspecie(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-900 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none cursor-pointer capitalize"
            >
              <option value="">Todas espécies</option>
              {especiesUnicas.map((esp) => (
                <option key={esp} value={esp} className="capitalize">
                  {esp}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Vivo/Morto */}
          <div className="relative w-60">
            <select
              value={filtroVivo}
              onChange={(e) => setFiltroVivo(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg bg-gray-900 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none cursor-pointer"
            >
              <option value="">Todos</option>
              <option value="alive">Vivos</option>
              <option value="dead">Mortos</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Busca por nome */}
          <input
            type="text"
            placeholder="Procurar por nome..."
            value={searchNome}
            onChange={(e) => setSearchNome(e.target.value)}
            className="w-60 px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-300"
          />
        </div>

        {/* GRID DE PERSONAGENS */}
        {personagensFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {personagensFiltrados.map((p) => (
              <CardPersonagem
                key={p.id}
                personagem={{
                  ...p,
                  image: p.image ? p.image : "/img/placeholder.png",
                }}
                onSelect={(id) => navigate(`/characters/${id}`)}
                className="hover:scale-105 transition-transform duration-200 shadow-lg"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 mt-10 text-lg">
            Nenhum personagem encontrado com os filtros selecionados.
          </p>
        )}

        {/* PAGINAÇÃO */}
        
<div className="flex justify-center items-center mt-[4rem] gap-4">
  <button
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
    className="px-5 py-2 !bg-yellow-500 text-black rounded-xl shadow-lg hover:!bg-yellow-400 hover:!border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.7)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
  >
    Anterior
  </button>

  <span className="text-white font-semibold text-lg">Página {page}</span>

  <button
    disabled={!hasNextPage}
    onClick={() => setPage((prev) => prev + 1)}
    className="px-5 py-2 !bg-yellow-500 text-black rounded-xl shadow-lg hover:!bg-yellow-400 hover:!border-yellow-400 hover:shadow-[0_0_15px_rgba(255,215,0,0.7)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
  >
    Próxima
  </button>
</div>

      </div>
    </div>
  );
}
