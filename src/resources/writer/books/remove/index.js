const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');

const schema = Joi.object({
  id: Joi.string()
    .trim()
    .messages({
      'string.empty': 'ID is required',
    }),
  bookID: Joi.string()
    .trim()
    .messages({
      'string.empty': 'bookID is required',
    }),
});

async function handler(ctx) {
  const data = ctx.request.body;
  const { id, bookID } = data;
  const writer = await writerService.atomic.update({ _id: id },
    {
      $pull: {
        books: { _id: bookID },
      },
    });
  ctx.body = writer;
  ctx.status = writer ? 200 : 400;
}

module.exports.register = (router) => {
  router.delete('/books', validate(schema), handler);
};
