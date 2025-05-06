// services/EquipmentService.js

const IEquipmentService = require('../interfaces/IEquipmentService');
const EquipmentModel = require('../models/Lens'); // Importe seu Model do Mongoose

class EquipmentService extends IEquipmentService {
  async getAllLenses() {
    // Busca diretamente no banco de dados
    const equipments = await EquipmentModel.find();
    return equipments;
  }
}

module.exports = EquipmentService;
