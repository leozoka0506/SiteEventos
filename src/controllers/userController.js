import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Middleware de validação para criação de usuário
export const validateUser = [
  body("name").trim().isLength({ min: 3 }).withMessage("O nome deve ter pelo menos 3 caracteres"),
  body("email").isEmail().withMessage("E-mail inválido").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("A senha deve ter pelo menos 6 caracteres"),
];

// Criar um novo usuário
export const createUser = async (req, res) => {
  // Verifica erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    // Verifica se o e-mail já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Usuário criado com sucesso!", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
