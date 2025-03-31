const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = []; // Simulando banco de dados em memória

// 🔹 Rota de registro
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ error: "Usuário já existe!" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };

  users.push(newUser);
  res.json({ message: "Usuário criado com sucesso!" });
});

module.exports = router;
