const createApp = require('./app');

const server = require('express')();

const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

server.get('*', (req, res) => {
  const app = createApp({ url: req.url });
  const context = {
    title: 'hello',
    meta: `<meta name="description" content="Vue.js 服务端渲染指南">`
  };
  renderer.renderToString(app, context).then(html => {
    res.send(html);
  }).catch(err => {
    res.status(500).end('Internal Server Error');
  });
});

server.listen(8080);
