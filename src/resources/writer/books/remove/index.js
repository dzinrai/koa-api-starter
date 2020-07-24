const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const _ = require('lodash');

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
  const results = await writerService.find({ _id: id });
  if (!results || !results.results) return;
  const books = results.results[0].books;
  _.remove(books, function(item) {
    return item.id === bookID || item._id === bookID;
  });
  const writer = await writerService.update({ _id: id}, (doc) => {
    doc.books = books;
    return doc;
  });
  if (writer) ctx.body = writer;
}

module.exports.register = (router) => {
  router.delete('/books', validate(schema), handler);
};
