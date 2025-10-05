import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

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

// Exporta o app para os testes
export default app;

// Só inicia o servidor se este arquivo for executado diretamente
if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}
