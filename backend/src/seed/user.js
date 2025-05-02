const mongoose = require('mongoose');
const User = require('./models/User'); // Importando o modelo User
require('dotenv').config();

async function seedInitialUsers() {
  try {
    // Conectar ao MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🔌 Conectado ao MongoDB para seed');

    // Verificar se já existem usuários
    const usuariosExistentes = await User.find();

    if (usuariosExistentes.length === 0) {
      // Inserir usuários iniciais
      await User.insertMany([
        { username: 'admin', password: 'admin123', roles: ['admin'] },
        { username: 'editor', password: 'editor123', roles: ['editor'] },
        { username: 'user', password: 'user123', roles: ['user'] },
      ]);
      console.log('✅ Usuários iniciais inseridos!');
    } else {
      console.log('⚠️ Usuários já existem na base de dados.');
    }
    
    // Fechar a conexão depois de inserir os dados
    mongoose.connection.close();
  } catch (erro) {
    console.error('❌ Erro ao rodar seed:', erro);
  }
}

// Rodar o seed
seedInitialUsers();
