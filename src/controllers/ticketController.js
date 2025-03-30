import Ticket from "../models/Ticket.js";
import express from "express";
import User from "../models/User.js";
import Event from "../models/Event.js";

const router = express.Router();

// Criar um novo ticket
export const createTicket = async (req, res) => {
    router.post("/", async (req, res) => {
        try {
          const { user, event, price } = req.body;
      
          // Verifica se o usuário existe
          const existingUser = await User.findById(user);
          if (!existingUser) {
            return res.status(400).json({ error: "Usuário não encontrado" });
          }
      
          // Verifica se o evento existe
          const existingEvent = await Event.findById(event);
          if (!existingEvent) {
            return res.status(400).json({ error: "Evento não encontrado" });
          }
      
          // Criação do ticket
          const ticket = new Ticket({ user, event, price });
          await ticket.save();
      
          res.status(201).json(ticket);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      });
};

export default router;
// Listar todos os tickets
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user event"); // Traz detalhes do usuário e evento
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um ticket por ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("user event");
    if (!ticket) return res.status(404).json({ error: "Ticket não encontrado" });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Excluir um ticket
export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ error: "Ticket não encontrado" });
    res.json({ message: "Ticket excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
