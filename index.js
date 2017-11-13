require('babel-core/register');

const Koa = require('koa');
const logger = require('koa-logger');
const views = require('koa-views');
const path = require('path');

const router = require('./router.js');

const app = module.exports = new Koa();

app.use(logger());

app.use(views(path.join(__dirname, '/views'), {
    extension: 'ejs'
}));

// app.use(async(ctx) => {
//     await ctx.render('home', {});
// });

app
    .use(router.routes())
    .use(router.allowedMethods());

if (!module.parent) app.listen(3000);