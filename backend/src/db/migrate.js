const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  const migrationsDir = path.join(__dirname, 'migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  for (const file of files) {
    const migration = require(path.join(migrationsDir, file));
    console.log(`🏃 Executando: ${file}`);
    await migration.up();
  }
}

async function runSeeders() {
  const seedersDir = path.join(__dirname, 'seeders');
  const files = fs.readdirSync(seedersDir).sort();

  for (const file of files) {
    const seeder = require(path.join(seedersDir, file));
    console.log(`🌱 Executando: ${file}`);
    await seeder.up();
  }
}

// Conecta e executa
mongoose.connect('mongodb://localhost:27017/gestao_equipamentos')
  .then(() => console.log('📦 Conectado ao MongoDB'))
  .then(runMigrations)
  .then(runSeeders)
  .catch(err => console.error('Erro:', err))
  .finally(() => mongoose.disconnect());