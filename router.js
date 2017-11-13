const Router = require('koa-router');
const router = new Router();
import * as api from './api/v1/index.js';

router
    .get('/home', async(ctx) => {
        await ctx.render('home', {});
    })
    .get('/testGraph', api.testGraph)
    .all('/basicGraph', api.basicGraph);

module.exports = router;