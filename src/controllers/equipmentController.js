// controllers/EquipmentController.js

const EquipmentService = require('../services/EquipmentService');

class EquipmentController {
  constructor() {
    this.equipmentService = new EquipmentService();
  }

  async createEquipment(req, res) {
    try {
      const { name, description } = req.body;
      const equipment = await this.equipmentService.create(name, description);
      res.status(201).json(equipment);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar equipamento' });
    }
  }

  async getAllEquipment(req, res) {
    try {
      const equipment = await this.equipmentService.getAll();
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar equipamentos' });
    }
  }

  async getEquipmentById(req, res) {
    try {
      const { id } = req.params;
      const equipment = await this.equipmentService.getById(id);
      if (!equipment) {
        return res.status(404).json({ error: 'Equipamento não encontrado' });
      }
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar equipamento' });
    }
  }

  async updateEquipment(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const equipment = await this.equipmentService.update(id, name, description);
      res.json(equipment);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar equipamento' });
    }
  }

  async deleteEquipment(req, res) {
    try {
      const { id } = req.params;
      await this.equipmentService.delete(id);
      res.json({ message: 'Equipamento deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar equipamento' });
    }
  }
}

module.exports = EquipmentController;
