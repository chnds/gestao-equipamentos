const express = require('express');
const connectDB = require('./src/db');
const lensRoutes = require('./src/routes/lensRoutes');

const app = express();
const PORT = 3600;

// Middleware
app.use(express.json());

// Database
connectDB();

// Rotas
app.use('/api/lenses', lensRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});