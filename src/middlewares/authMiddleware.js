import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

/**
 * Middleware para verificar o token JWT enviado no header Authorization.
 * 
 * Passos:
 * 1. Extrai o token do header Authorization (formato: "Bearer <token>").
 * 2. Verifica se o token está presente; se não, retorna 401.
 * 3. Verifica a validade do token usando JWT_SECRET.
 * 4. Busca o usuário no banco pelo id decodificado no token, excluindo a senha.
 * 5. Anexa o usuário (sem senha) no objeto req para uso nas próximas rotas/middlewares.
 * 6. Se algo falhar, retorna 401 com erro de autorização.
 * 
 * IMPORTANTE: Este middleware deve ser usado antes de rotas que precisam de autenticação.
 */

export const verifyToken = async (req, res, next) => {
  // Pega o token do header 'Authorization' no formato "Bearer <token>"
  const token = req.header("Authorization")?.split(" ")[1];

  // Se não houver token, retorna erro 401
  if (!token) {
    return res.status(401).json({ error: "Não autorizado, token ausente" });
  }

  try {
    // Verifica e decodifica o token com a chave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    // Busca o usuário pelo id presente no token (decodificado)
    // Remove o campo 'password' da resposta por segurança    
    req.user = await User.findById(decoded.id).select("-password");

    // Continua para o próximo middleware ou rota
    next();
  } catch (error) {
    // Se token inválido ou expirado, retorna erro 401
    res.status(401).json({ error: "Token inválido" });
  }
};
