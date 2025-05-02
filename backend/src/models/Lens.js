const mongoose = require('mongoose');

const LensSchema = new mongoose.Schema({
  modelo: String, // Corresponde a "module" no seu documento
  tipo: String,   // Já está correto
  distancia_focal: String, // Corrigido para match com "distance(s, focal"
  abertura_maxima: String, // Corresponde a "aperture_maxima"
  montagem: String, // Corrigido para match com "montagem"
  estabilizacao: Boolean, // Corresponde a "estabilizacao"
  peso: String,    // Corresponde a "peso" (era "proc_grams")
  filtro: String,  // Adicionado para match com "filtro"
  preco_aproximado: Number, // Já está correto
  categoria: String, // Adicionado para match com o documento
  status: {
    type: String,
    enum: ['disponivel', 'emprestado', 'manutencao'],
    default: 'disponivel'
  }
}, { 
  collection: 'lentes' // Nome exato da coleção no MongoDB
});

module.exports = mongoose.model('Lens', LensSchema);