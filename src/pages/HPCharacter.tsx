// src/pages/HPCharacter.tsx
import React, { useEffect, useState } from "react";
import { getCharacters } from "../services/character";
import type { Character } from "../types/character";
import { CardPersonagem } from "../components/CardPersonagem";
import { useNavigate } from "react-router-dom";

export default function HPCharacter() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filtroCasa, setFiltroCasa] = useState("");
  const [filtroEspecie, setFiltroEspecie] = useState("");
  const [filtroVivo, setFiltroVivo] = useState("");
  const [searchNome, setSearchNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getCharacters()
      .then((data) => setCharacters(data))
      .catch((err) => {
        console.error(err);
        setError("Falha ao carregar personagens.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Extrai espécies únicas para o select
  const especiesUnicas = Array.from(new Set(characters.map(c => c.species).filter(Boolean)));

  // Filtra personagens conforme filtros e busca
  const personagensFiltrados = characters.filter((c) =>
    (!filtroCasa || (c.house && c.house === filtroCasa)) &&
    (!filtroEspecie || (c.species && c.species === filtroEspecie)) &&
    (!filtroVivo || (filtroVivo === "alive" ? c.alive : !c.alive)) &&
    (!searchNome || c.name.toLowerCase().includes(searchNome.toLowerCase()))
  );

  // Loading
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white">
        <img src="/img/logo-harry-potter.png" alt="Carregando..." className="w-24 h-24 mb-4 animate-spin" />
        <p className="text-lg">Carregando personagens...</p>
      </div>
    );
  }

  // Erro
  if (error) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-red-500">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black w-full text-white">
      <div className="container py-6">
        <h1 className="text-4xl md:text-5xl font-harry mb-8 text-center text-yellow-400 drop-shadow-lg">
          Personagens de Harry Potter
        </h1>

      {/* Filtros */}
<div className="flex flex-col md:flex-row gap-4 mb-8 justify-center items-center flex-wrap">

  {/* Filtro Casa */}
  <div className="relative">
    <select
      value={filtroCasa}
      onChange={(e) => setFiltroCasa(e.target.value)}
      className="px-4 py-2 pr-10 rounded-lg bg-gray-900 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none"
    >
      <option value="">Todas casas</option>
      <option value="Gryffindor">Gryffindor</option>
      <option value="Slytherin">Slytherin</option>
      <option value="Hufflepuff">Hufflepuff</option>
      <option value="Ravenclaw">Ravenclaw</option>
    </select>
    {/* Seta customizada */}
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Filtro Espécie */}
  <div className="relative">
    <select
      value={filtroEspecie}
      onChange={(e) => setFiltroEspecie(e.target.value)}
      className="px-4 py-2 pr-10 rounded-lg bg-gray-900 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none"
    >
      <option value="">Todas espécies</option>
      {especiesUnicas.map((esp) => (
        <option key={esp} value={esp}>{esp}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Filtro Vivo/Morto */}
  <div className="relative">
    <select
      value={filtroVivo}
      onChange={(e) => setFiltroVivo(e.target.value)}
      className="px-4 py-2 pr-10 rounded-lg bg-gray-900 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none"
    >
      <option value="">Todos</option>
      <option value="alive">Vivos</option>
      <option value="dead">Mortos</option>
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>

  {/* Pesquisa por nome */}
  <input
    type="text"
    placeholder="Procurar por nome..."
    value={searchNome}
    onChange={(e) => setSearchNome(e.target.value)}
    className="px-4 py-2 rounded-lg bg-gray-900 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-yellow-300"
  />
</div>


        {/* Grid de personagens */}
        {personagensFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {personagensFiltrados.map((p) => (
              <CardPersonagem
                key={p.id}
                personagem={{
                  ...p,
                  image: p.image ? p.image : "/img/placeholder.png", //placeholder quando não tem imagem
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
      </div>
    </div>
  );
}
