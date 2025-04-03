// services/EquipmentService.js

const IEquipmentService = require('../interfaces/IEquipmentService');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EquipmentService extends IEquipmentService {
  async create(name, description) {
    return await prisma.equipment.create({
      data: { name, description },
    });
  }

  async getAll() {
    return await prisma.equipment.findMany();
  }

  async getById(id) {
    return await prisma.equipment.findUnique({
      where: { id },
    });
  }

  async update(id, name, description) {
    return await prisma.equipment.update({
      where: { id },
      data: { name, description },
    });
  }

  async delete(id) {
    await prisma.equipment.delete({
      where: { id },
    });
  }
}

module.exports = EquipmentService;
