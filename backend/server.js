import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // instale com: npm i node-fetch

const app = express();
app.use(cors());

// rota raiz (para teste rápido)
app.get("/", (req, res) => {
  res.send("Servidor do Harry Potter Backend está online 🪄");
});

// rota intermediária com a API externa
app.get("/characters", async (req, res) => {
  try {
    const response = await fetch("https://hp-api.onrender.com/api/characters");
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default app;
