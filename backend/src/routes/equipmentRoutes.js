// Importa o Express para criar rotas
const express = require('express');

// Importa o controller responsável pela lógica de negócio dos equipamentos
const EquipmentController = require('../controllers/EquipmentController');

// Importa os esquemas de validação do Joi para criação e atualização de equipamentos
const { createEquipmentSchema, updateEquipmentSchema } = require('../validators/equipmentValidator');

// Importa o middleware de validação genérico que utiliza os esquemas do Joi
const validate = require('../middlewares/validate');

// Importa o middleware de autorização baseado em papéis (RBAC)
const { authorize } = require('../middlewares/auth');

// Cria um roteador Express para definir as rotas relacionadas a equipamentos
const router = express.Router();

// Instancia o controller para usar seus métodos nas rotas
const controller = new EquipmentController();

// Define a rota POST para criar um equipamento
router.post(
  '/',
  authorize(['admin']),                  // Middleware que permite apenas usuários com papel "admin"
  validate(createEquipmentSchema),       // Middleware que valida o corpo da requisição com o Joi
  controller.createEquipment.bind(controller) // Método do controller que cria o equipamento
);

// Define a rota GET para buscar todos os equipamentos
router.get('/', controller.getAllEquipment.bind(controller));

// Define a rota GET para buscar um equipamento pelo ID
router.get('/:id', controller.getEquipmentById.bind(controller));

// Define a rota PUT para atualizar um equipamento pelo ID
router.put(
  '/:id',
  authorize(['admin']),                  // Apenas "admin" pode atualizar
  validate(updateEquipmentSchema),       // Validação dos dados enviados
  controller.updateEquipment.bind(controller)
);

// Define a rota DELETE para remover um equipamento pelo ID
router.delete(
  '/:id',
  authorize(['admin']),                  // Apenas "admin" pode deletar
  controller.deleteEquipment.bind(controller)
);

// Exporta o roteador para ser usado no app principal
module.exports = router;
