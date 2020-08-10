const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');

const validBook = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string().required(),
  genre: Joi.string().valid('novel', 'poem').required(),
});

const schema = Joi.object({
  id: Joi.string()
    .trim()
    .messages({
      'string.empty': 'ID is required',
    }),
  newBookList: Joi.array().items(Joi.object(validBook)).allow(null),
});

async function handler(ctx) {
  const data = ctx.request.body;
  const { id, newBookList } = data;
  const writer = await writerService.atomic.update({ _id: id }, {
    $set: {
      books: !newBookList ? [] : newBookList,
    },
  });
  ctx.body = writer;
  ctx.status = writer ? 200 : 400;
}

module.exports.register = (router) => {
  router.put('/books', validate(schema), handler);
};
