/**
 * Middleware para proteger rotas que requerem permissão de administrador.
 * 
 * Verifica se o usuário está autenticado e se o campo 'role' é 'admin'.
 * Se não atender aos requisitos, retorna erro 403 (proibido).
 * Caso contrário, permite a continuação da requisição.
 * 
 * Assumimos que antes deste middleware existe outro que popula 'req.user',
 * geralmente após autenticação via JWT ou sessão.
 */

const adminMiddleware = (req, res, next) => {
    // Verifica se existe usuário autenticado e se o papel é 'admin'
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Acesso negado. Requer permissão de administrador." });
    }
    // Se tudo certo, passa para o próximo middleware ou rota
    next();
  };
  
  export default adminMiddleware;
  