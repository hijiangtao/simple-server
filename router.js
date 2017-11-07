const Router = require('koa-router');
const router = new Router();
import * as api from './api/v1/index.js';

router.get('/test', function (ctx, next) {
    api.test(ctx, next);
}).get('/user', function (ctx, next) {
    api.user(ctx, next);
});

module.exports = router;