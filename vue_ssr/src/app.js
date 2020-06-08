import Vue from 'vue';

import { sync } from 'vuex-router-sync';

import App from './App.vue';

import { createRouter } from './router';

import { createStore } from './store';

export function createApp () {
  const router = createRouter();
  const store = createStore();
  const app = new Vue({
    render: h => h(App),
    router,
    store
  });
  return { app, router, store };
}
