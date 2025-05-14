import { body, validationResult } from "express-validator";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import Event from "../models/Event.js";

// Middleware de validação para criação de ticket
export const validateTicket = [
  body("user").isMongoId().withMessage("ID do usuário inválido"),
  body("event").isMongoId().withMessage("ID do evento inválido"),
  body("price").isFloat({ min: 0 }).withMessage("O preço deve ser um número positivo"),
];

// Criar um novo ticket
export const createTicket = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { user, event, price } = req.body;

    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const existingEvent = await Event.findById(event);
    if (!existingEvent) {
      return res.status(400).json({ error: "Evento não encontrado" });
    }

    const ticket = new Ticket({ user, event, price });
    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Listar todos os tickets
export const getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user event");
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
// Atualizar ticket
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const ticket = await Ticket.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!ticket) return res.status(404).json({ error: "Ticket não encontrado" });

    res.json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

