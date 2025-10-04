import React, { createContext, useState, useEffect } from "react";
import type { Character } from "../types/character";

export interface FavoritoContextType {
  favoritos: Character[];
  toggleFavorito: (personagem: Character) => void;
}

// Cria o contexto com valores padrão
export const FavoritoContext = createContext<FavoritoContextType>({
  favoritos: [],
  toggleFavorito: () => {},
});

// Provider como função normal
export function FavoritoProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [favoritos, setFavoritos] = useState<Character[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("favoritos");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    } catch {}
  }, [favoritos]);

  const toggleFavorito = (personagem: Character) => {
    setFavoritos(prev =>
      prev.some(f => f.name === personagem.name)
        ? prev.filter(f => f.name !== personagem.name)
        : [...prev, personagem]
    );
  };

  return (
    <FavoritoContext.Provider value={{ favoritos, toggleFavorito }}>
      {children}
    </FavoritoContext.Provider>
  );
}
