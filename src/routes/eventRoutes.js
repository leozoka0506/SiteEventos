import express from "express";
import { deleteEvent } from "../controllers/eventController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.delete("/:id", authMiddleware, adminMiddleware, deleteEvent); // Apenas admins podem excluir eventos

export default router;
