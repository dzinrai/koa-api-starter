const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');

const schema = Joi.object({
  firstName: Joi.string()
    .trim()
    .messages({
      'string.empty': 'First name is required',
    }),
  lastName: Joi.string()
    .trim()
    .messages({
      'string.empty': 'Last name is required',
    }),
  age: Joi.number(),
});


async function validator(ctx, next) {
  const { writer } = ctx.validatedData;

  await next();
}

async function handler(ctx) {
  const data = ctx.request.body;
  console.log(data);

  const writer = await writerService.create({
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    books: []
  });
  if (writer) ctx.body = writer;
}
module.exports.register = (router) => {
  router.post('/', validate(schema), validator, handler);
};
