import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/characters", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const response = await fetch("https://hp-api.onrender.com/api/characters");
    const data = await response.json();

    const filtered = data.map((character) => ({
      name: character.name,
      species: character.species || "Desconhecida",
      house: character.house || "Desconhecida",
      alive: character.alive ?? true,
      image: character.image || "/img/placeholder.png",
      gender: character.gender || "Desconhecido",
      dateOfBirth: character.dateOfBirth || "Desconhecida",
      dateOfDeath: character.dateOfDeath || null,
      patronus: character.patronus || "Desconhecido",
      school: character.school || "Desconhecida",
    }));

    const startIndex = (page - 1) * limit;
    const paginatedData = filtered.slice(startIndex, startIndex + limit);

    res.status(200).json({
      page,
      limit,
      total: filtered.length,
      results: paginatedData,
    });
  } catch (error) {
    console.error("Erro ao buscar personagens:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});


app.get("/spells", async (req, res) => {
  try {
    const response = await fetch("https://hp-api.onrender.com/api/spells");
    const data = await response.json();

    const spells = data.map((spell) => ({
      name: spell.name,
      incantation: spell.incantation || "Desconhecido",
      type: spell.type || "Desconhecido",
      effect: spell.effect || "Sem descrição",
      description: spell.description || spell.effect || "Sem descrição",
    }));

    res.status(200).json(spells);
  } catch (error) {
    console.error("Erro ao buscar feitiços:", error);
    res.status(500).json({ message: "Erro ao carregar feitiços" });
  }
});

export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}
