// src/services/character.ts
import { API_BASE } from "./apiBase";
import type { Character } from "../types/character";

export const getCharacters = async (): Promise<Character[]> => {
  const res = await fetch(`${API_BASE}/characters`);
  if (!res.ok) throw new Error("Erro ao buscar personagens");

  const data: Omit<Character, "id">[] = await res.json();

  return data.map((char, index) => ({
    id: `${char.name.toLowerCase().replace(/\s+/g, "_")}_${index}`, // id gerado
    name: char.name,
    species: char.species,
    house: char.house,
    alive: char.alive,
    image: char.image,
    gender: char.gender,
    dateOfBirth: char.dateOfBirth,
    dateOfDeath: char.dateOfDeath,
    patronus: char.patronus,
    school: char.school,
  }));
};

export const getCharacterById = async (id: string): Promise<Character | null> => {
  const characters = await getCharacters();
  return characters.find((char) => char.id === id) || null;
};
