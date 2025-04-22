const Joi = require('joi');

const validarRegistro = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required().messages({
      'string.empty': 'O nome é obrigatório',
      'string.min': 'O nome deve ter no mínimo 3 caracteres'
    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email inválido',
      'string.empty': 'O email é obrigatório'
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'A senha deve ter no mínimo 6 caracteres',
      'string.empty': 'A senha é obrigatória'
    })
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ 
      success: false,
      error: error.details[0].message 
    });
  }

  next(); // Dados válidos, pode seguir
};

module.exports = validarRegistro;
