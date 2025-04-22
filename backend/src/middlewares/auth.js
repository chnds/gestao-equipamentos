const { expressjwt: expressJwt } = require('express-jwt');

// Configura o middleware de autenticação JWT
const authenticate = expressJwt({ 
  secret: process.env.JWT_SECRET, // Chave secreta do .env
  algorithms: ['HS256'], // Algoritmo de criptografia
  getToken: (req) => {
    // Extrai o token do header Authorization (formato: Bearer <token>)
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null; // Se não encontrar token
  }
});

// Middleware de autorização baseada em papéis (RBAC)
function authorize(roles = []) {
  // Converte string única para array
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    authenticate, // Primeiro verifica autenticação
    (req, res, next) => {
      // Encontra usuário na "base de dados"
      const user = users.find(u => u.id === req.auth.id);
      
      // Verifica se usuário existe e tem os papéis necessários
      if (!user || (roles.length && !roles.some(r => user.roles.includes(r)))) {
        return res.status(403).json({ message: 'Acesso não autorizado' });
      }
      
      // Adiciona usuário ao request para uso posterior
      req.user = user;
      next(); // Passa para o próximo middleware
    }
  ];
}