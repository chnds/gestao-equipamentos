const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
const SECRET_KEY = "seu_segredo_super_secreto"; // Em produção, use uma variável de ambiente.

let users = []; // Simulação de banco de dados em memória

// 🔹 Rota de teste
app.get("/", (req, res) => {
  res.send("API está rodando 🚀");
});

// 🔹 Rota de Registro
app.post("/register", async (req, res) => {
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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Credenciais inválidas" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login realizado com sucesso", token });
});

// 🔹 Rota Protegida (Exemplo)
app.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Acesso autorizado", user: req.user });
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

// 🔥 Iniciar o Servidor
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
