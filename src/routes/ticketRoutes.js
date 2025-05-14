import express from "express";
import { createTicket, getTickets } from "../controllers/ticketController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  deleteTicket
} from "../controllers/ticketController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.put("/:id", authMiddleware, updateTicket);
router.delete("/:id", authMiddleware, deleteTicket);
router.post("/", authMiddleware, createTicket); // Agora só usuários autenticados podem criar tickets
router.get("/", getTickets);

export default router;
