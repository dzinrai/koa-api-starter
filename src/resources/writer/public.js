const Router = require('@koa/router');


const router = new Router();

require('./get').register(router);
require('./getByID').register(router);
require('./getMany').register(router);
require('./create').register(router);
require('./update').register(router);
require('./delete').register(router);

require('./books/add').register(router);
require('./books/remove').register(router);
require('./books/rewrite').register(router);

module.exports = router.routes();
