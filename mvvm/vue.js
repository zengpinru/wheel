import observe from './observe.js';
import Dep from './dep.js';
import Watcher from './watcher.js';

function Vue (options = {}) {
  const { data, methods } = options;
  this.$options = options;
  this._data = data;
  observe(data); // 劫持data

  // 数据代理
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get () {
        return this._data[key];
      },
      set (newVal) {
        this._data[key] = newVal;
      }
    });
  }

  // 对方法的处理,拿来测试用的
  if (typeof methods === 'object') {
    for (let key in methods) {
      this[key] = function (...args) {
        methods[key].apply(this, args);
      }
    }
  }

  this.$watch = function (exp, callback) {
    new Watcher(callback, exp, this);
  }
}

export default Vue;
