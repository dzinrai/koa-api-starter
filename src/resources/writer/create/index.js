const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const capitalize = require('./capitalize');

const validBook = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string().required(),
  genre: Joi.string().valid('novel', 'poem').required(),
});

const schema = Joi.object({
  firstName: Joi.string()
    .trim()
    .messages({
      'string.empty': 'First name is required',
    }).required(),
  lastName: Joi.string()
    .trim()
    .messages({
      'string.empty': 'Last name is required',
    }).required(),
  age: Joi.number().integer().messages({
    'any.required': 'Age is required',
  }).required(),
  books: Joi.array().items(validBook).allow(null),
});

async function validator(ctx, next) {
  const newWriter = ctx.validatedData;
  newWriter.lastName = await capitalize(newWriter.lastName);
  newWriter.firstName = await capitalize(newWriter.firstName);
  await next();
}

async function handler(ctx) {
  const data = ctx.validatedData;

  const writer = await writerService.create({
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    books: data.books
  });
  if (writer) ctx.body = writer;
}
module.exports.register = (router) => {
  router.post('/', validate(schema), validator, handler);
};
