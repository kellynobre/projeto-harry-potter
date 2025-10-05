// src/pages/HPCharacterDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterById } from "../services/character";
import type { Character } from "../types/character";

export default function HPCharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getCharacterById(id)
        .then(setCharacter)
        .catch(() => setError("Falha ao carregar o personagem."))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-white">
        <img
          src="/img/logo-harry-potter.png"
          alt="Carregando personagem..."
          className="w-24 h-24 mb-4 animate-spin"
        />
        <p className="text-lg">Carregando personagem...</p>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-black text-red-500">
        <p className="text-lg">{error || "Personagem não encontrado..."}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 !bg-yellow-500 text-black rounded-lg shadow hover:!bg-yellow-400 transition-colors"
        >
          Voltar
        </button>
      </div>
    );
  }

  const houseColor = character.house
    ? character.house === "Gryffindor" ? "text-red-500" :
      character.house === "Slytherin" ? "text-green-500" :
      character.house === "Hufflepuff" ? "text-yellow-400" :
      character.house === "Ravenclaw" ? "text-blue-400" :
      "text-white"
    : "text-white";

  const renderInfo = (title: string, value?: string, color?: string) =>
    value && <InfoCard title={title} value={value} color={color} />;

  return (
    <div className="w-full min-h-screen py-[120px] bg-black">
      <div className="text-yellow-400 py-6 shadow-md">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl md:text-4xl font-harry drop-shadow-lg">{character.name}</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 !bg-yellow-500 !border-bg-yellow-500 hover:!border-white text-black font-semibold rounded-lg shadow hover:!bg-white transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10 items-center md:items-start">
        <img
          src={character.image || "/img/placeholder.png"}
          alt={character.name}
          className="w-full max-w-[24rem] max-h-[24rem] object-cover rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.7)] border-4 border-yellow-400 transform transition hover:scale-105"
        />

        <div className="flex-1 w-full space-y-6 bg-black bg-opacity-60 backdrop-blur-md p-8 rounded-2xl shadow-[0_0_30px_rgba(255,215,0,0.5)] hover:shadow-[0_0_50px_rgba(255,215,0,0.7)] transition-all">
          {renderInfo("House", character.house || "Unknown", houseColor)}
          {renderInfo("Species", character.species || "Unknown")}
          {renderInfo("Status", character.alive ? "Alive" : "Deceased", character.alive ? "text-green-500" : "text-red-500")}
          {renderInfo("Gender", character.gender)}
          {renderInfo("Date of Birth", character.dateOfBirth)}
          {renderInfo("Date of Death", character.dateOfDeath)}
          {renderInfo("Patronus", character.patronus)}
          {renderInfo("School", character.school)}
        </div>
      </div>
    </div>
  );
}

const InfoCard: React.FC<{ title: string; value: string; color?: string }> = ({ title, value, color }) => (
  <div className="p-4 rounded-lg bg-gray-900 bg-opacity-30 border-l-4 border-yellow-400 hover:bg-gray-800 transition-colors">
    <h2 className="text-lg font-semibold mb-1">{title}</h2>
    <p className={`text-lg font-medium ${color || "text-gray-200"} capitalize`}>{value}</p>
  </div>
);
