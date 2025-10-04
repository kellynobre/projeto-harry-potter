// src/types/character.ts
export interface Character {
  id: string;       // slug gerado internamente
  name: string;
  species?: string;
  house?: string;
  alive?: boolean;
  image?: string;
}
