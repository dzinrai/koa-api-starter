const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  const dbqwe = await writerService.find({ '_id': ctx.params.id});
  ctx.body = dbqwe;
}

module.exports.register = (router) => {
  router.get('/:id', handler);
};
