// 学习文章：https://mp.weixin.qq.com/s/IhMyaCYrTAXJcKSPSnEOjw
async function run () {
  if ('serviceWorker' in window.navigator) {
    try {
      const reg = await navigator.serviceWorker.register('/service_worker/sw.js', { scope: '/service_worker/' });
      console.log('注册');
      // navigator.serviceWorker.controller.postMessage
      // reg.active.postMessage('this message is from page');
      // navigator.serviceWorker.addEventListener('message', (event) => {
      //   console.log(event.data);
      // });
      // const messageChannel = new MessageChannel();
      // messageChannel.port1.onmessage = e => {
      //   console.log(e.data);
      // };
      // reg.active.postMessage('this message is from page, to sw', [messageChannel.port2]);
    } catch (err) {
      console.log(err);
    }
  }
}

run();
