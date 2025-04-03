// Importa o Prisma Client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();  // Cria uma instância do Prisma Client

async function createEquipment() {
  // Cria um novo equipamento no banco de dados
  const newEquipment = await prisma.equipment.create({
    data: {
      name: 'Camera',  // Nome do equipamento
      description: 'A high-end DSLR camera',  // Descrição do equipamento
    },
  });

  console.log('Novo equipamento cadastrado:', newEquipment);  // Exibe o equipamento criado
  await prisma.$disconnect();  // Fecha a conexão com o banco de dados
}

createEquipment();  // Chama a função para criar um novo equipamento
