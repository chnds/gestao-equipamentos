// createEquipment.js
const { PrismaClient } = require('@prisma/client');  // Importa o Prisma Client
const prisma = new PrismaClient();  // Cria uma instância do Prisma Client

async function createEquipment() {
  const newEquipment = await prisma.equipment.create({
    data: {
      name: 'Camera',
      description: 'A high-end DSLR camera',
    },
  });
  console.log(newEquipment);  // Exibe o equipamento criado
}

createEquipment();  // Chama a função para criar um novo equipamento
