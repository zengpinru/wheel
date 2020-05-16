// 如何监控网页崩溃: https://mp.weixin.qq.com/s/EscBLM3hAoCrYn9r9zFmng
// 方式一：利用页面的load和beforeunload事件来实现
window.addEventListener('load', function () {
  sessionStorage.setItem('good_exit', 'pending');
  setInterval(() => {
    sessionStorage.setItem('time_before_crash', new Date().toString());
  }, 1000);
});

window.addEventListener('beforeunload', function () {
  console.log('test1');
  sessionStorage.setItem('good_exit', 'true');
});

if (sessionStorage.getItem('good_exit') && sessionStorage.getItem('good_exit') !== 'true') {
  console.log('test');
}

// 方式二：利用serviceWorker实现心跳机制来实现

// 异常捕获的文章：https://mp.weixin.qq.com/s/3A1MYQTkvc98nP6yjbS-8w
