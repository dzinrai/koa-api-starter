const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');

const schema = Joi.object({
  id: Joi.string()
    .trim()
    .messages({
      'string.empty': 'ID is required',
    }),
});


async function validator(ctx, next) {
  const { writer } = ctx.validatedData;

  await next();
}

async function handler(ctx) {
  const data = ctx.request.body;
  const updatedWriter = await writerService.atomic.update({ '_id': data.id},{
    $set: {
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      books: data.books,
    }
  });
  ctx.body = updatedWriter;
  ctx.status = updatedWriter ? 200 : 400;
  
}
module.exports.register = (router) => {
  router.post('/update', validate(schema), validator, handler);
};
