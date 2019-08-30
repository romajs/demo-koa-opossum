const KoaRouter = require('koa-router');

const circuitBreaker = require('./middlewares/circuitBreaker');

const router = new KoaRouter();

router.get('/', circuitBreaker.create({},
  ctx => {
    ctx.body = 'Hello';
    return Promise.resolve(); // FIXME:
  }
));

router.get('/fail', circuitBreaker.create({},
  ctx => {
    ctx.thrown('fail');
  },
  ctx => {
    ctx.body = 'Sorry, out of service right now';
  }
));

module.exports = router;
