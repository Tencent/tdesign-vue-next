import { config } from '@vue/test-utils';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { renderToString } from 'vue/server-renderer';
import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import TDesign from '@tdesign/components';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();
const router = createRouter({
  history: createWebHistory(),
  routes: [],
});

config.global.plugins = [TDesign];

config.global.createSSRApp = (comp) => {
  const app = createApp(comp);
  app.config.globalProperties.$route = {};
  app.use(TDesign);
  app.use(router);
  return renderToString(app);
};
