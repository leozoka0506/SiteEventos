import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Criar usuário
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Verifica se o email já existe
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "E-mail já cadastrado" });

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obter todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Não retorna a senha
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
