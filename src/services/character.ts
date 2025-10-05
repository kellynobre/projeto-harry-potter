import { API_BASE } from "./apiBase";
import type { Character } from "../types/character";

interface PaginatedResponse {
  page: number;
  limit: number;
  total: number;
  results: Omit<Character, "id">[];
}

export const getCharacters = async (page = 1, limit = 12): Promise<Character[]> => {
  const res = await fetch(`${API_BASE}/characters?page=${page}&limit=${limit}`);
  if (!res.ok) throw new Error("Erro ao buscar personagens");

  const data: PaginatedResponse = await res.json();

  return data.results.map((char, index) => ({
    id: `${char.name.toLowerCase().replace(/\s+/g, "_")}_${index + (page - 1) * limit}`, // id único por página
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
