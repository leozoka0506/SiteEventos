import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// Criar um novo evento
router.post("/", async (req, res) => {
    try {
      const { title, date, location } = req.body;
  
      if (!title || !date || !location) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios!" });
      }
  
      const event = new Event({ title, date, location });
      await event.save();
      
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });  

// Listar todos os eventos
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
