// https://juejin.im/post/5b06a7b3f265da0dd8567513
// this.addEventListener('install', (event) => {
//   console.log('Service Worker install');
//   event.waitUntil(
//     caches.open('sw_demo').then(cache => {
//       return cache.addAll([
//         '/service_worker/index.html',
//         '/service_worker/index.css',
//         '/service_worker/app.js',
//         '/service_worker/sw.js'
//       ]);
//     })
//   );
// });

// this.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then(res => {
//       return res || 
//         fetch(event.request)
//           .then(responese => {
//             const responeseClone = responese.clone();
//             caches.open('sw_demo').then(cache => {
//               cache.put(event.request, responeseClone);
//             });
//             return responese;
//           })
//           .catch(err => {
//             console.log(err);
//           })
//     })
//   );
// });

// this.addEventListener('activate', (event) => {
//   console.log('Service Worker activate');
// });

// this.addEventListener('message', (event) => {
//   console.log(event.data);
//   // event.source.postMessage('this message is from sw.js, to page');
//   // setInterval(() => {
//   //   this.clients.matchAll().then(client => {
//   //     client[0].postMessage('定时器到期了~~~');
//   //   });
//   // }, 3 * 1000);
//   // console.log(event.ports);
//   event.ports[0].postMessage('this message is from sw.js, to page');
// });

this.addEventListener('install', (event) => {
  console.log('安装');
});

this.addEventListener('activate', (event) => {
  console.log('激活');
});
