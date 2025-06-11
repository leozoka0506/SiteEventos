import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // Importando middleware de autenticação

const router = express.Router();

// Rota de teste
router.get("/", (req, res) => {
    res.send("Rota de autenticação funcionando!");
});

// Rota de registro
router.post("/register", registerUser);

// Rota de login
router.post("/login", loginUser);

// Rota protegida - Perfil do usuário
router.get("/profile", verifyToken, getUserProfile);

export default router;