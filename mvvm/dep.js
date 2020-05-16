// 收集依赖
function Dep () {
  this.subs = []; // 存储依赖的数组(Watcher的实例)
}

Dep.prototype.addSub = function (sub) {
  this.subs.push(sub);
}

Dep.prototype.notify = function () {
  this.subs.forEach(sub => sub.update());
}

Dep.target = null; // 存放当前要收集的依赖(watcher实例)

export default Dep;
