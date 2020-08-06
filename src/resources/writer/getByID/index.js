const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  let query = {};
  if (ctx.params.id) query = { '_id': ctx.params.id};
  const document = await writerService.findOne(query);
  ctx.body = document;
  ctx.status = document ? 200 : 400;
}

module.exports.register = (router) => {
  router.get('/:id', handler);
};
