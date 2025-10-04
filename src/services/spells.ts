import { API_BASE } from "./apiBase";
import type { Spell } from "../types/spell";

export const getSpells = async (): Promise<Spell[]> => {
  const res = await fetch(`${API_BASE}/spells`);
  if (!res.ok) throw new Error("Erro ao buscar feitiços");
  
  return res.json();
};

