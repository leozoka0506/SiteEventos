import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

// Carrega variáveis de ambiente do arquivo .env para process.env
dotenv.config();

// Conecta ao banco de dados MongoDB (conexão via mongoose)
connectDB();

const app = express();

// Middlewares globais

// Habilita CORS para permitir requisições de diferentes origens (domínios)
app.use(cors());

// Middleware para parsear JSON no corpo das requisições HTTP
app.use(express.json());

// Definição das rotas da API com seus respectivos endpoints
app.use("/api/auth", authRoutes);    // Rotas de autenticação (login, registro etc)
app.use("/api/users", userRoutes);   // Rotas para manipulação de usuários (CRUD)
app.use("/api/events", eventRoutes); // Rotas para manipulação de eventos
app.use("/api/tickets", ticketRoutes); //Rotas para manipulação de tickets

// Rota raiz simples para testar se a API está online
app.get("/", (req, res) => {
  res.send("API está rodando...");
});

// Middleware para tratamento de rotas não encontradas (404)
// Deve vir após todas as rotas declaradas para capturar requisições inválidas
app.use((req, res, next) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware de tratamento de erros globais
// Captura erros lançados em qualquer parte do app e responde com status 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
});



// Define a porta do servidor, padrão 5000 se não especificado na variável de ambiente
const PORT = process.env.PORT || 5000;

// Inicializa o servidor HTTP e escuta conexões na porta definida
const server = app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});


// Exporta o servidor para possibilitar testes automatizados (ex: supertest)
export default server;


export { app, server };
