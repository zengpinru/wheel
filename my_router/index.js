class HashRouter {
  constructor () {
    this.routes = {};
    this.currentUrl = '';
    window.addEventListener('load', this.refresh.bind(this), false);
    window.addEventListener('hashchange', this.refresh.bind(this), false);
  }
  route (path, cb) {
    this.routes[path] = cb || function () {};
  }
  refresh () {
    const hash = location.hash.slice(1) || '/';
    this.currentUrl = hash;
    this.routes[this.currentUrl]();
  }
}

// const router = new HashRouter();
// const content = document.querySelector('body');

// function changeBgColor (ctx, color) {
//   ctx.style.backgroundColor = color;
// }

// router.route('/', function () {
//   changeBgColor(content, 'yellow');
// });

// router.route('/blue', function () {
//   changeBgColor(content, 'blue');
// });

// router.route('/green', function () {
//   changeBgColor(content, 'green');
// });

// const btn1 = document.querySelector('#btn1');
// const btn2 = document.querySelector('#btn2');

// btn1.addEventListener('click', () => {
//   //
// });

// btn2.addEventListener('click', () => {
//   //
// });

class HistoryRouter {
  constructor () {
    this.routes = {};
    this._bindPopState();
  }

  _bindPopState () {
    // pushState,replaceState是不会触发popstate事件的,只有点击了浏览器的前进后退和调用go、back、forward方法才会触发popstate事件
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }

  route (path, cb) {
    this.routes[path] = cb || function () {};
  }

  go (path) {
    history.pushState({ path }, null, path);
    this.routes[path] && this.routes[path]();
  }
}

const historyRouter = new HistoryRouter();
const ul = document.querySelector('#ul');
const content = document.querySelector('body');
function changeBgColor (ctx, color) {
  ctx.style.backgroundColor = color;
}
historyRouter.route('/', function () {
  changeBgColor(content, 'yellow');
});

historyRouter.route('/blue', function () {
  changeBgColor(content, 'blue');
});

historyRouter.route('/green', function () {
  changeBgColor(content, 'green');
});
ul.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault();
    historyRouter.go(e.target.getAttribute('href'));
  }
});
console.log(historyRouter);
