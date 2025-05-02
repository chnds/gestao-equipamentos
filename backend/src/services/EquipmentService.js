// services/EquipmentService.js

const IEquipmentService = require('../interfaces/IEquipmentService');
const EquipmentModel = require('../models/Lens'); // Importe seu Model do Mongoose
const cache = require('../config/cache'); // Importe a instância do Memcached

class EquipmentService extends IEquipmentService {
  async getAllLenses() {
    const cacheKey = 'equipments:all';
  
    const cachedData = await new Promise((resolve, reject) => {
      cache.get(cacheKey, (err, data) => {
        if (err) {
          console.error('Erro ao obter dados do cache:', err);
          return resolve(null); // em caso de erro, ignora cache e continua
        }
        resolve(data);
      });
    });
  
    if (cachedData) {
      console.log('Dados de equipamentos obtidos do cache.');
      return JSON.parse(cachedData);
    }
  
    // Se não tiver no cache, busca no banco
    const equipments = await EquipmentModel.find();
  
    // Salva no cache para próximas requisições
    cache.set(cacheKey, JSON.stringify(equipments), 3600, (err) => {
      if (err) {
        console.error('Erro ao salvar dados no cache:', err);
      }
    });
  
    return equipments;
  }
  
}

module.exports = EquipmentService;