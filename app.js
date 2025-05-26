import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from './config/db.js';
import blogRoutes from "./routes/blogRoutes.js";

// Inicializar o app
const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api", blogRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API do Blog está funcionando!");
});

// Configurar porta
const PORT = process.env.PORT || 5000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
