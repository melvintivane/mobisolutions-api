import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import connectDB from './config/db.js';
import blogRoutes from "./routes/blogRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";

// Inicializar o app
const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api", blogRoutes);
app.use("/api", emailRoutes);

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
