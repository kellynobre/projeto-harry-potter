// src/components/CardPersonagem.tsx
import React from "react";
import type { Character } from "../types/character";
import { useFavoritos } from "../contexts/useFavoritos";

interface Props {
  personagem: Character;
  onSelect: (id: string) => void;
}

export const CardPersonagem: React.FC<Props> = ({ personagem, onSelect }) => {
  const { favoritos, toggleFavorito } = useFavoritos();
  const isFavorito = favoritos.some(f => f.id === personagem.id);

  const casaColor = personagem.house
    ? personagem.house === "Gryffindor" ? "text-red-500" :
      personagem.house === "Slytherin" ? "text-green-500" :
      personagem.house === "Hufflepuff" ? "text-yellow-400" :
      personagem.house === "Ravenclaw" ? "text-blue-400" :
      "text-white"
    : "text-white";

  return (
    <div
      className="flex flex-col justify-start bg-black bg-opacity-70 backdrop-blur-md p-4 rounded-xl cursor-pointer transform transition hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.5)] min-h-[350px]"
      onClick={() => onSelect(personagem.id)}
    >
      <img
        src={personagem.image || "/img/placeholder.png"}
        alt={personagem.name}
        className="w-32 h-32 object-cover rounded-xl mx-auto mb-3 border-2 border-yellow-400 shadow-md"
      />

      <h3 className="text-center text-white text-lg font-harry mb-1">{personagem.name}</h3>

      {personagem.house && (
        <p className={`text-center text-sm mb-1 ${casaColor} font-semibold`}>
          Casa: {personagem.house}
        </p>
      )}

      {personagem.species && (
        <p className="text-center text-sm mb-2 text-gray-200 capitalize">
          Espécie: {personagem.species}
        </p>
      )}

     
      <div className="mt-auto">
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorito(personagem); }}
          className={`w-full py-1 rounded-lg text-[16px] transition-colors duration-200
            focus:outline-none focus:ring-0
            ${isFavorito
              ? "!bg-red-600 text-white hover:!bg-red-700 hover:!border-red-700"
              : "!bg-yellow-500 text-black hover:!bg-yellow-400 hover:!border-yellow-400"
            }`}
        >
          {isFavorito ? "Remover" : "Favoritar"}
        </button>
      </div>
    </div>
  );
};
