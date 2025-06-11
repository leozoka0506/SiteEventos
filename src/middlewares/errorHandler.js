/**
 * Middleware global de tratamento de erros para Express.
 * 
 * Captura qualquer erro passado pela função `next(err)` em rotas ou middlewares.
 * Define o status HTTP adequado e envia uma resposta JSON com a mensagem de erro.
 * 
 * Se o status atual da resposta for 200 (OK), altera para 500 (erro interno).
 * Caso o erro não tenha mensagem, envia uma mensagem genérica.
 */

const errorHandler = (err, req, res, next) => {
    // Define o status HTTP: se status 200, altera para 500; senão mantém o que já está
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({ 
      error: err.message || "Erro interno do servidor" 
    });
  };
  
  export default errorHandler;
  