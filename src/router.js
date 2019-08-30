const KoaRouter = require('koa-router');

const router = new KoaRouter();

router.get('/', ctx => {
  ctx.body = 'Hello';
});

router.get('/fail', ctx => {
  throw new Error('fail');
});

module.exports = router;
