/* eslint-disable no-new */
import Vue from 'vue';
import VueRouter from 'vue-router';
import TDesign from '../src/index';
import routes from './routes';
import app from './app.vue';
import Layout from './components/layout.vue';
import Demo from './components/demo.vue';
import ComponentContributors from './components/component-contributors.vue';
import '../common/style/web/index.less';
import '@/common/style/web/docs.less';
import '@/common/style/site/index.less';

Vue.use(TDesign);
Vue.use(VueRouter);

// markdown 页
Vue.component('tdesign-layout', Layout);
Vue.component('tdesign-demo', Demo);
Vue.component('tdesign-component-contributors', ComponentContributors);

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
