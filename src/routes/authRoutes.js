const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();

const SECRET_KEY = "seu_segredo_super_secreto"; // Em produção, use variável de ambiente.

let users = []; // Simulação de banco de dados em memória

// 🔹 Rota de Registro
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ error: "Usuário já registrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);

  res.json({ message: "Usuário registrado com sucesso" });
});

// 🔹 Rota de Login (Geração de Token JWT)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login realizado com sucesso", token });
});

// 🔐 Middleware de Autenticação
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Acesso negado. Token ausente" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
}

// 🔹 Rota Protegida
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Acesso autorizado", user: req.user });
});

module.exports = router;
