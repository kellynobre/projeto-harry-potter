// src/types/character.ts
export interface Character {
  id: string;
  name: string;
  species?: string;
  gender?: string;
  house?: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  alive?: boolean;
  patronus?: string;
  school?: string;
  image?: string;
}
