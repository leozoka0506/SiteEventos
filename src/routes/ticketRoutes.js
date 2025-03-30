import express from "express";
import { createTicket, getTickets, getTicketById, deleteTicket } from "../controllers/ticketController.js";

const router = express.Router();

router.post("/", createTicket); // Criar um ticket
router.get("/", getTickets); // Listar todos os tickets
router.get("/:id", getTicketById); // Obter um ticket por ID
router.delete("/:id", deleteTicket); // Excluir um ticket

export default router;
