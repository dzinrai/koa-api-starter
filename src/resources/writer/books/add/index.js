const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const shortid = require('shortid');

const validBook = Joi.object({
  title: Joi.string().required(),
  genre: Joi.string().valid('novel', 'poem').required(),
});

const schema = Joi.object({
  id: Joi.string()
    .trim()
    .messages({
      'string.empty': 'ID is required',
    }),
  book: validBook
    .messages({
      'object.empty': 'Books is required',
    }),
});

async function handler(ctx) {
  const data = ctx.validatedData;
  const newBook = data.book;
  newBook._id = shortid.generate();
  const writer = await writerService.atomic.update({ _id: data.id }, {
    $push: {
      books: newBook,
    },
  });
  ctx.body = writer;
  ctx.status = writer ? 200 : 400;
}

module.exports.register = (router) => {
  router.post('/books', validate(schema), handler);
};
