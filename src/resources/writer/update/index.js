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
  const updatedWriter = await writerService.update({ '_id': data.id}, (doc) => {
    if (data.firstName) doc.firstName = data.firstName;
    if (data.lastName) doc.lastName = data.lastName;
    if (data.age) doc.age = data.age;
    if (data.books) doc.books = data.books;
    return doc;
  });
  if (updatedWriter) ctx.body = updatedWriter;
  
}
module.exports.register = (router) => {
  router.post('/update', validate(schema), validator, handler);
};
