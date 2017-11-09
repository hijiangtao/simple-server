const Router = require('koa-router');
const router = new Router();
import * as api from './api/v1/index.js';

router.get('/api', async(ctx, next) => {
    await api.test(ctx, next);
}).all('/basicGraph', api.basicGraph);

module.exports = router;