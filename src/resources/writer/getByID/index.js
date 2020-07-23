const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  let query = {};
  if (ctx.params.id) query = { '_id': ctx.params.id};
  const dbqwe = await writerService.find(query);
  ctx.body = dbqwe;
}

module.exports.register = (router) => {
  router.get('/', handler);
};
