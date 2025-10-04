import { useContext } from "react";
import { FavoritoContext } from "./PersonagemFavoritoContext";

export function useFavoritos() {
  return useContext(FavoritoContext);
}
