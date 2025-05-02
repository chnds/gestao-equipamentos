// db/migrations/20231121-create-lenses.js
const mongoose = require('mongoose');

module.exports = {
  async up() {
    // Cria a coleção com validações
    await mongoose.connection.db.createCollection('lentes', {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["modelo", "montagem"],
          properties: {
            modelo: { bsonType: "string" },
            montagem: { 
              bsonType: "string",
              enum: ["EF", "EF-S", "RF"] 
            }
          }
        }
      }
    });
    
    console.log('✅ Coleção "lentes" criada');
  },

  async down() {
    await mongoose.connection.db.dropCollection('lentes');
    console.log('❌ Coleção "lentes" removida');
  }
};