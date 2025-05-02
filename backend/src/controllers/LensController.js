const EquipmentService = require('../services/EquipmentService');
const Lens = require('../models/Lens');
const cache = require('../config/cache');

const equipmentService = new EquipmentService();

// Controller methods
const getAllLensesUsingService = async (req, res) => {
  try {
    const lenses = await equipmentService.getAllLenses();
    res.status(200).json(lenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLensesDirectly = async (req, res) => {
  try {
    const lenses = await Lens.find({});
    res.status(200).json(lenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLensesWithCache = async (req, res) => {
  const cacheKey = 'lenses:all';
  
  try {
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const lenses = await equipmentService.getAllLenses();
    await cache.set(cacheKey, JSON.stringify(lenses), 3600);
    res.status(200).json(lenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exportação corrigida
module.exports = {
  getAllLensesUsingService,
  getAllLensesDirectly,
  getAllLensesWithCache
};