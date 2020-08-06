const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  const testFullDb = await writerService.find({});
  ctx.body = testFullDb;
}

module.exports.register = (router) => {
  router.get('/', handler);
};
