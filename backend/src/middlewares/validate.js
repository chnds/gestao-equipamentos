// backend/src/middlewares/validate.js
const Joi = require('joi');

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.context.key,
        message: detail.message.replace(/"/g, '')
      }));
      return res.status(400).json({ errors });
    }
    next();
  };
}

module.exports = validate;