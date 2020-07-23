const Joi = require('@hapi/joi');

const validBook = Joi.object({
  _id: Joi.string() | Joi.object().required(),
  title: Joi.string().required(),
  genre: Joi.string().valid('novel', 'poem').required(),
});

const schema = Joi.object({
  _id: Joi.string() | Joi.object(),
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
  age: Joi.number()
    .required(),
  books: Joi.array().items(validBook).allow(null),
});

module.exports = (obj) => schema.validate(obj, { allowUnknown: false });
