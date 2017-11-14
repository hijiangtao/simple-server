require('babel-core/register'); // 改写 require 钩子函数
require('babel-polyfill'); // 针对一些 ES6+ 新增 API 进行 polyfill

const Koa = require('koa');
const logger = require('koa-logger');
const views = require('koa-views');
const serve = require('koa-static');
const path = require('path');

const rootRouter = require('./router/root.js');
const userRouter = require('./router/user.js');

const app = module.exports = new Koa();

app.use(logger());

app.use(views(path.join(__dirname, '/views'), {
    extension: 'ejs'
}));

app.use(serve(path.join(__dirname, '/public')));

app
    .use(rootRouter.routes())
    .use(rootRouter.allowedMethods())
    .use(userRouter.routes())
    .use(userRouter.allowedMethods());

if (!module.parent) app.listen(3000);