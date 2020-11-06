/* eslint-disable no-new */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import app from './app.vue';
import Layout from './components/layout.vue';
import Demo from './components/demo.vue';
import ComponentContributors from './components/component-contributors.vue';
import TDesign from '../src/index';
import '../common/style/web/index.less';
import '@/common/style/web/docs.less';
import '@/common/style/site/index.less';

// import TDesign from '../dist/tdesign.js';
// import TDesign from '../es/index.js';
// import '../dist/tdesign.css';


Vue.use(TDesign);
Vue.use(VueRouter);

// markdown 页
Vue.component('tdesign-layout', Layout);
Vue.component('tdesign-demo', Demo);
Vue.component('tdesign-component-contributors', ComponentContributors);

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const router = new VueRouter({
  mode: process.env.PUBLICPATH === './' ? 'hash' : 'history',
  base: 'vue',
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
