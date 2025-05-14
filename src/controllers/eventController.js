import { body, validationResult } from "express-validator";
import Event from "../models/Event.js";

// Middleware de validação para criação de evento
export const validateEvent = [
  body("title").trim().isLength({ min: 5 }).withMessage("O título deve ter pelo menos 5 caracteres"),
  body("date").isISO8601().withMessage("Formato de data inválido"),
  body("location").trim().notEmpty().withMessage("A localização é obrigatória"),
];

// Criar um novo evento
export const createEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Listar todos os eventos
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter um evento por ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Evento não encontrado" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar evento
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!event) return res.status(404).json({ error: "Evento não encontrado" });

    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//deleta evento
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    res.status(200).json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

