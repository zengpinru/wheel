import Dep from './dep.js';
// 数据劫持的构造函数, 数据劫持的逻辑的实现
function Observe (data) {
  for (let key in data) {
    let val = data[key];
    let dep = new Dep();
    observe(val); // 递归继续向下,实现深度的数据劫持
    Object.defineProperty(data, key, {
      configurable: true,
      get () {
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        observe(val); // 对新增的值也要劫持
        dep.notify(); // 触发依赖
      }
    });
  }
}

// 数据劫持
function observe (data) {
  if (!data || typeof data !== 'object') { // 递归的终止条件
    return;
  }
  return new Observe(data);
}

export default observe;
