// backend/src/middlewares/schemas.js
const Joi = require('joi');

module.exports = {
  register: Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
      'string.min': 'Nome deve ter pelo menos 3 caracteres',
      'any.required': 'Nome é obrigatório'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Por favor, insira um email válido'
    }),
    password: Joi.string().min(6).pattern(/^[a-zA-Z0-9]+$/).required().messages({
      'string.pattern.base': 'Senha deve conter apenas letras e números'
    }),
    role: Joi.string().valid('user', 'admin').default('user')
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    oldPassword: Joi.string(),
    newPassword: Joi.string().min(6).when('oldPassword', {
      is: Joi.exist(),
      then: Joi.required()
    })
  }).min(1) // Pelo menos um campo deve ser enviado
};