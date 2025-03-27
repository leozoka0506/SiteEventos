import dotenv from "dotenv"
import express from "express"
import eventRoutes from "./routes/eventRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import connectDB from "./config/db.js"

dotenv.config();
console.log("MONGO_URI:", process.env.MONGO_URI); // Para testar se a variável está carregando



const app = express();

// Conectar ao Banco de Dados
connectDB();

app.use(express.json()); // Permite o uso de JSON nas requisições

const PORT = process.env.PORT || 5000;

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
