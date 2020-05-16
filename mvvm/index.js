import Vue from './vue.js';

const vue = new Vue({
  data: {
    name: 'zeng',
    age: 12,
    info: {
      parent: 'parent',
      age: 33
    }
  },
  methods: {
    fn () {
      this.info.age = 89;
    }
  }
});
vue.$watch('info.age', function (newVal) {
  console.log(newVal);
});
vue.fn();
