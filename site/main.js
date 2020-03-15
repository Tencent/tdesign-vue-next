/* eslint-disable no-new */
import Vue from 'vue';
import VueRouter from 'vue-router';
import TDesign from '../src/index';
import '../theme/index.less';
import routes from './routes';
import app from './app.vue';
import Layout from './components/layout.vue';
import Demo from './components/demo.vue';
import './styles/index.less';
import '../theme/docs.less';

Vue.use(TDesign);
Vue.use(VueRouter);

// markdown 页
Vue.component('spfx-layout', Layout);
Vue.component('spfx-demo', Demo);

const router = new VueRouter({
  mode: 'hash',
  routes,
});

const globalConfig = {
  env: process.env.NODE_ENV,
};

new Vue({
  el: '#app',
  provide: { globalConfig },
  components: { app },
  router,
});
