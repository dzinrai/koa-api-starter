const writerService = require('resources/writer/writer.service');
const Joi = require('@hapi/joi');
const validate = require('middlewares/validate');
const _ = require('lodash');

const schema = Joi.object({
  pageNumber: Joi.number()
    .integer().min(0)
    .messages({
      'any.required': 'pageNumber is required',
    }).required(),
  documentsInPage: Joi.number()
    .integer().min(1).max(5)
    .messages({
      'any.required': 'documentsInPage is required',
    }).required(),
  sortBy: Joi.string().valid('createdOn', 'firstName', 'lastName', 'id').default('id'),
  sortOrder: Joi.string().valid('desc', 'asc')
});

async function handler(ctx) {
  const search = ctx.request.body;
  const writers = await writerService.find({}, {
    page: Number(search.pageNumber),
    perPage: Number(search.documentsInPage)
  });
  const result = _.sortBy(writers.results, [search.sortBy]);
  ctx.status = result.length ? 200 : 400;
  ctx.body = {
    data: search.sortOrder === 'desc' ? result.reverse() : result, 
    meta: {
      numberOfAllDocuments: result.length
    }
  };
}

module.exports.register = (router) => {
  router.post('/all', validate(schema), handler);
};
