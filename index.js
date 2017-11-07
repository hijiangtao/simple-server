require('babel-register');

const Koa = require('koa');
const router = require('./router.js');

const app = new Koa();

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000);