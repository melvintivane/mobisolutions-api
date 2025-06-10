import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import connectDB from './config/db.js';
import blogRoutes from "./routes/blogRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import path from 'path';

// Define __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicializar o app
const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Configura o Express para servir arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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