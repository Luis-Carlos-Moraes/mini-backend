// app/Middleware/AuthMiddleware.js
function AuthMiddleware(req, res, next) {
  // Em produção, aqui validaríamos token/JWT etc.
  // Para o desafio, vamos injetar um usuário fixo.
  req.user = {
    id: 1,
    name: 'Usuário Demo',
    email: 'usuario.demo@example.com',
  };

  next();
}

module.exports = AuthMiddleware;
