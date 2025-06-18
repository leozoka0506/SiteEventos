import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} from "../controllers/ticketController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Criar ticket (usuário autenticado)
router.post("/", verifyToken, createTicket);

// Listar todos os tickets
router.get("/", getTickets);

// Obter um ticket por ID
router.get("/:id", getTicketById);

// Atualizar um ticket (usuário autenticado)
router.put("/:id", verifyToken, updateTicket);

// Deletar um ticket (usuário autenticado)
router.delete("/:id", verifyToken, deleteTicket);

export default router;
