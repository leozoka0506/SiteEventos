import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  validateEvent,
} from "../controllers/eventController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

// ✅ Criar um novo evento (somente admin autenticado)
router.post("/", verifyToken, adminMiddleware, validateEvent, createEvent);

// ✅ Listar todos os eventos
router.get("/", getEvents);

// ✅ Obter evento por ID
router.get("/:id", getEventById);

// ✅ Atualizar evento (somente admin autenticado)
router.put("/:id", verifyToken, adminMiddleware, validateEvent, updateEvent);

// ✅ Excluir evento (somente admin autenticado)
router.delete("/:id", verifyToken, adminMiddleware, deleteEvent);

// ✅ Exporta corretamente para uso no server.js
export default router;
