// routes/equipmentRoutes.js

const express = require('express');
const EquipmentController = require('../controllers/equipmentController');

const router = express.Router();
const equipmentController = new EquipmentController();

// Rotas de equipamentos
router.post('/equipment', equipmentController.createEquipment.bind(equipmentController));
router.get('/equipment', equipmentController.getAllEquipment.bind(equipmentController));
router.get('/equipment/:id', equipmentController.getEquipmentById.bind(equipmentController));
router.put('/equipment/:id', equipmentController.updateEquipment.bind(equipmentController));
router.delete('/equipment/:id', equipmentController.deleteEquipment.bind(equipmentController));

module.exports = router;
