const Joi = require('joi');

const createEquipmentSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().max(255).optional()
});

const updateEquipmentSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  description: Joi.string().max(255).optional()
});

module.exports = {
  createEquipmentSchema,
  updateEquipmentSchema
};
