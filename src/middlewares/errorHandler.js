const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ error: err.message || "Erro interno do servidor" });
  };
  
  export default errorHandler;
  