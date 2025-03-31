import express from "express";
import { createTicket, getTickets } from "../controllers/ticketController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createTicket); // Agora só usuários autenticados podem criar tickets
router.get("/", getTickets);

export default router;
