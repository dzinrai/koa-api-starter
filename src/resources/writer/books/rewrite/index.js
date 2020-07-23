const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const _ = require('lodash');

const validBook = Joi.object({
  _id: Joi.string() | Joi.object().required(),
  title: Joi.string().required(),
  genre: Joi.string().valid('novel', 'poem').required(),
});

const schema = Joi.object({
  id: Joi.string()
    .trim()
    .messages({
      'string.empty': 'ID is required',
    }),
  newBookList: Joi.array().allow(null),
});


async function validator(ctx, next) {
  const { writer } = ctx.validatedData;

  await next();
}

async function handler(ctx) {
  const data = ctx.request.body;
  const { id, newBookList } = data;
  const writer = await writerService.update({ _id: id}, (doc) => {
    doc.books = newBookList ? newBookList : [];
    return doc;
  });
  if (writer) ctx.body = writer;
}

module.exports.register = (router) => {
  router.put('/books', validate(schema), validator, handler);
};
