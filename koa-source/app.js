const MyKoa = require('./my-koa');
const Router = require('./router');
const static = require('./static');

const app = new MyKoa();
const router = new Router();

function delay () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('delay');
      resolve();
    }, 100);
  });
}

app.use(static(__dirname + '\\public'));

router.get('/index', async (ctx) => {
  ctx.body = JSON.stringify({ page: 'index' });
});

router.get('/test', async (ctx) => {
  ctx.body = JSON.stringify({ page: 'test' });
});

app.use(router.routes());

// app.use(async (ctx, next) => {
//   ctx.body = '1';
//   await next();
//   ctx.body += '5';
// });

// app.use(async (ctx, next) => {
//   ctx.body += '2';
//   await delay();
//   await next();
//   ctx.body += '4';
// });

// app.use(async (ctx, next) => {
//   ctx.body += '3';
// });

app.listen(3000, () => {
  console.log('listen at 3000...');
});
