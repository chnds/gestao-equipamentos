const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/gestao_equipamentos');
    console.log('🟢 Conectado ao MongoDB (Banco: gestao_equipamentos)');
    console.log(await mongoose.connection.db.listCollections().toArray()); // Lista todas coleções
  } catch (error) {
    console.error('🔴 Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Encerra o servidor em caso de falha
  }
}

module.exports = connectDB;