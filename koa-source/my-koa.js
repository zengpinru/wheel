const http = require('http');
const context = require('./context');
const request = require('./request');
const response = require('./response');

class MyKoa {
  constructor () {
    this.middlewares = [];
  }
  compose (middlewares) {
    return function (ctx) {
      function dispatch (i) {
        let fn = middlewares[i];
        if (!fn) {
          return Promise.resolve();
        }
        return Promise.resolve(fn(ctx, function next () {
          return dispatch(i + 1);
        }));
      }
      return dispatch(0);
    }
  }
  // 构建上下文
  createContext (req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.request.req = req;
    ctx.response.res = res;
    ctx.req = req;
    ctx.res = res;
    return ctx;
  }
  use (callback) {
    this.middlewares.push(callback);
  }
  listen (...args) {
    const server = http.createServer(async (req, res) => {
      // 构建上下文
      const ctx = this.createContext(req, res);
      const fn = this.compose(this.middlewares);
      await fn(ctx);
      res.end(ctx.body);
    });
    server.listen(...args);
  }
}

module.exports = MyKoa;
