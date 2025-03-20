const express = require('express');
const cors = require('cors');
const equipmentRoutes = require('./routes/equipmentRoutes'); // Caminho correto para as rotas

const app = express();

app.use(cors());
app.use(express.json());

// Defina uma rota raiz para garantir que o servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

// Usando as rotas do equipamento
app.use('/equipment', equipmentRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
