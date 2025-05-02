const Lens = require('../../models/Lens');

module.exports = {
  async up() {
    await Lens.insertMany([
      {
        modelo: "EF 50mm f/1.8 STM",
        montagem: "EF",
        status: "disponivel"
      },
      {
        modelo: "RF 24-70mm f/2.8L",
        montagem: "RF",
        status: "manutencao"
      }
    ]);
    console.log('✅ Dados iniciais inseridos');
  },

  async down() {
    await Lens.deleteMany();
    console.log('❌ Dados removidos');
  }
};