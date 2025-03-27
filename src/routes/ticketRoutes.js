import express from "express";
import Ticket from "../models/Ticket.js";

const router = express.Router();

// Criar um novo ingresso
router.post("/", async (req, res) => {
    try {
      const ticket = new Ticket(req.body);
      await ticket.save();
      res.status(201).json(ticket);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
// Listar todos os ingressos
router.get("/", async (req, res) => {
    try {
      const tickets = await Ticket.find().populate("user").populate("event");
      res.json(tickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  export default router;  