import Dep from './dep.js';
function Watcher (callback, exp, vm) {
  this.callback = callback; // 监听的数据发生变化的时候执行的回调函数
  this.exp = exp; // 对象路径 比如'a.b.c'
  this.vm = vm; // vue的实例
  let arr = exp.split('.');
  let val = vm;
  let index = 1;
  arr.forEach(key => {
    if (index === arr.length) {
      Dep.target = this;
    }
    index++;
    val = val[key]; // 读取vue实例上的数据,触发get函数
  });
  Dep.target = null;
}

Watcher.prototype.update = function () {
  let arr = this.exp.split('.');
  let val = this.vm;
  arr.forEach(key => {
    val = val[key];
  });
  this.callback(val);
}

export default Watcher;
