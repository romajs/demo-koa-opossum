const Koa = require('koa');
const accesslog = require('koa-accesslog');

const router = require('./router');

const app = new Koa();

app.use(accesslog());
app.use(router.routes());

module.exports = app;
