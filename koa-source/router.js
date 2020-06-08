class Router {
  constructor () {
    this.stack = [];
  }
  get (path, middleware) {
    this.register(path, 'get', middleware);
  }
  post (path, middleware) {
    this.register(path, 'post', middleware);
  }
  register (path, method, middleware) {
    this.stack.push({
      path,
      method,
      middleware
    });
  }
  routes () {
    const that = this;
    let route;
    return async function (ctx, next) {
      const currentPath = ctx.url;
      for (let i = 0; i < that.stack.length; i ++) {
        let item = that.stack[i];
        if (currentPath === item.path && item.method === ctx.method) {
          route = item.middleware;
          break;
        }
      }
      if (typeof route === 'function') {
        route(ctx, next);
        return;
      }
      await next();
    };
  }
}

module.exports = Router;
