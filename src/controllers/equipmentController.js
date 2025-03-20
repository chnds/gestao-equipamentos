const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createEquipment = async (req, res) => {
  try {
    const { name, description } = req.body;
    const equipment = await prisma.equipment.create({
      data: { name, description },
    });
    res.status(201).json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar equipamento' });
  }
};

const getAllEquipment = async (req, res) => {
  try {
    const equipment = await prisma.equipment.findMany();
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar equipamentos' });
  }
};

const getEquipmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const equipment = await prisma.equipment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!equipment) return res.status(404).json({ error: 'Equipamento não encontrado' });
    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar equipamento' });
  }
};

const updateEquipment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const equipment = await prisma.equipment.update({
      where: { id: parseInt(id) },
      data: { name, description },
    });

    res.json(equipment);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar equipamento' });
  }
};

const deleteEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.equipment.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Equipamento deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar equipamento' });
  }
};

module.exports = {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
};
