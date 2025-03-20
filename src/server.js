// server.js

const express = require('express');
const cors = require('cors');
const equipmentRoutes = require('./routes/equipmentRoutes');

const app = express();

// Middlewares
app.use(express.json()); // Permite receber JSON no corpo da requisição
app.use(cors()); // Habilita CORS para requisições externas

// Usar as rotas de equipamentos
app.use('/api', equipmentRoutes);

// Configuração do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
