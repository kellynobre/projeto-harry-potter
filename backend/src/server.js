import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import characterRoutes from "./src/routes/characters.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use("/characters", characterRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

export default app;
