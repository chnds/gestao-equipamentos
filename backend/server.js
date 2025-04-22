  const express = require("express");
  const helmet = require("helmet");
  const cors = require("cors");
  const authRoutes = require("./src/routes/authRoutes"); // Importação das rotas

  require("dotenv").config();

  const app = express();

  // 🛡️ Configurar Helmet para segurança HTTP
  app.use(helmet());

  // 🌍 Configurar CORS para permitir apenas localhost durante testes
  const corsOptions = {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));

  // Middleware para processar JSON
  app.use(express.json());

  // 🔹 Rota de teste
  app.get("/", (req, res) => {
    res.send("API está rodando 🚀");
  });

  // 🔹 Usando as rotas de autenticação
  app.use("/auth", authRoutes); // Agora as rotas serão acessadas com o prefixo "/auth"

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
