const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');

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
  book: Joi.object()
    .messages({
      'object.empty': 'Books is required',
    }),
});


async function validator(ctx, next) {
  const { writer } = ctx.validatedData;

  await next();
}

async function handler(ctx) {
  const data = ctx.request.body;
  const newBook = data.book;
  const results = await writerService.find({ _id: data.id });
  if (!results || !results.results) return;
  const currentWriter = results.results[0];
  const books = Array.isArray(currentWriter.books) ? [...currentWriter.books, newBook] : [newBook];
  const writer = await writerService.update({ _id: data.id}, (doc) => {
    doc.books = books;
    return doc;
  });
  if (writer) ctx.body = writer;
}

module.exports.register = (router) => {
  router.post('/books', validate(schema), validator, handler);
};
