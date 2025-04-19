import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Registro de Usuário
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se o usuário já existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Usuário já cadastrado" });
        }

        // Criptografa a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Cria o novo usuário
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (error) {
        res.status(500).json({ error: "Erro no servidor" });
    }
};

export const loginUser = async (req, res) => {
    try {
        console.log("🔹 Iniciando login...");

        const { email, password } = req.body;
        console.log("📩 E-mail recebido:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("❌ Usuário não encontrado");
            return res.status(400).json({ error: "Usuário não encontrado" });
        }

        console.log("✅ Usuário encontrado:", user.email);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("❌ Senha incorreta");
            return res.status(400).json({ error: "Credenciais inválidas" });
        }

        console.log("🔑 Gerando token...");
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        console.log("✅ Login bem-sucedido!");
        res.json({ token });
    } catch (error) {
        console.error("🚨 Erro no login:", error);
        res.status(500).json({ error: "Erro no servidor", details: error.message });
    }
};

export const getUserProfile = async (req, res) => {
    try {
      const user = await User.findById(req.user._id).select("-password");
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar perfil do usuário" });
    }
  };
  



