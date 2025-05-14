import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";


dotenv.config();

const router = express.Router();
router.get("/", verifyToken, adminMiddleware, getUsers);
router.get("/:id", verifyToken, getUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, adminMiddleware, deleteUser);

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Verifica se já existe um usuário com esse e-mail
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o usuário
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user", // Define o papel padrão como "user"
    });

    await newUser.save();

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login do usuário
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Promover usuário para admin
router.put("/promote/:id", verifyToken, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    user.role = "admin";
    await user.save();

    res.json({ message: "Usuário promovido a administrador" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
});

export default router;