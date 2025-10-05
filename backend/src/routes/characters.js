import express from "express";
import { getCharacters } from "../services/hpAPI.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Erro ao buscar personagens" });
  }
});

export default router;
