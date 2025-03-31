const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ error: "Acesso negado. Requer permissão de administrador." });
    }
    next();
  };
  
  export default adminMiddleware;
  