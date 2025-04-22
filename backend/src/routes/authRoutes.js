require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();
const validarRegistro = require('./middlewares/user');

// Configurações
const SECRET_KEY = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = "1h";
const SALT_ROUNDS = 10;

// Simulação de banco de dados em memória (substitua por um banco real em produção)
let users = [
  // Usuário admin padrão (apenas para desenvolvimento)
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123", SALT_ROUNDS),
    roles: ["admin"]
  }
];

/**
 * 🔹 Rota de Registro
 * Registra um novo usuário no sistema
 */
router.post("/register",validarRegistro, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validação dos campos
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "Todos os campos (nome, email, senha) são obrigatórios" 
      });
    }

    // Verifica se o email já está cadastrado
    if (users.some(user => user.email === email)) {
      return res.status(409).json({ 
        success: false,
        error: "Email já cadastrado" 
      });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    
    // Cria novo usuário
    const newUser = { 
      id: users.length + 1, 
      name, 
      email, 
      password: hashedPassword,
      roles: ["user"] // Papel padrão para novos usuários
    };

    users.push(newUser);

    // Retorna sucesso (não retorna dados sensíveis)
    res.status(201).json({ 
      success: true,
      message: "Usuário registrado com sucesso",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        roles: newUser.roles
      }
    });

  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ 
      success: false,
      error: "Erro interno no servidor" 
    });
  }
});

/**
 * 🔹 Rota de Login (Geração de Token JWT)
 * Autentica usuário e retorna token JWT
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: "Email e senha são obrigatórios" 
      });
    }

    // Encontra usuário
    const user = users.find(user => user.email === email);
    
    // Verifica credenciais
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ 
        success: false,
        error: "Credenciais inválidas" 
      });
    }

    // Cria token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email,
        roles: user.roles 
      }, 
      SECRET_KEY, 
      { expiresIn: TOKEN_EXPIRATION }
    );

    // Retorna token e informações básicas do usuário
    res.json({ 
      success: true,
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roles: user.roles
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ 
      success: false,
      error: "Erro interno no servidor" 
    });
  }
});

/**
 * 🔐 Middleware de Autenticação
 * Verifica e valida o token JWT
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: "Acesso negado. Token não fornecido" 
    });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ 
        success: false,
        error: "Token inválido ou expirado" 
      });
    }

    // Adiciona informações do usuário ao request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      roles: decoded.roles
    };
    
    next();
  });
}

/**
 * 🔐 Middleware de Autorização
 * Verifica se usuário tem os papéis necessários
 */
function authorize(roles = []) {
  return (req, res, next) => {
    // Se nenhum role for especificado, apenas verifica autenticação
    if (!roles.length) return next();
    
    // Verifica se usuário tem algum dos papéis necessários
    const hasRole = roles.some(role => req.user.roles.includes(role));
    
    if (!hasRole) {
      return res.status(403).json({ 
        success: false,
        error: "Acesso negado. Permissões insuficientes" 
      });
    }
    
    next();
  };
}

/**
 * 🔹 Rota Protegida - Perfil do Usuário
 * Acessível apenas por usuários autenticados
 */
router.get("/profile", authenticateToken, (req, res) => {
  // Encontra usuário completo (sem a senha)
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ 
      success: false,
      error: "Usuário não encontrado" 
    });
  }

  // Retorna dados do perfil (exceto senha)
  const { password, ...userData } = user;
  res.json({ 
    success: true,
    user: userData 
  });
});

/**
 * 🔹 Rota Protegida - Apenas Admin
 * Acessível apenas por usuários com papel 'admin'
 */
router.get("/admin", authenticateToken, authorize(['admin']), (req, res) => {
  res.json({ 
    success: true,
    message: "Acesso autorizado à área administrativa",
    user: req.user
  });
});

module.exports = router;  