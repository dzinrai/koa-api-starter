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
  const deletedWriter = await writerService.remove({ '_id': data.id});
  if (deletedWriter) ctx.body = deletedWriter;
}
module.exports.register = (router) => {
  router.delete('/', validate(schema), validator, handler);
};
