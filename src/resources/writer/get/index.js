const writerService = require('resources/writer/writer.service');

async function handler(ctx) {
  const dbqwe = await writerService.find({});
  ctx.body = dbqwe;
  
}

module.exports.register = (router) => {
  router.get('/', handler);
};
