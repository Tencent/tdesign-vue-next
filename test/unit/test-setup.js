import { config } from '@vue/test-utils';
import { createApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import createFetchMock from 'vitest-fetch-mock';
import { vi } from 'vitest';
import TDesign from '@/src/index';

const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();

config.global.plugins = [TDesign];

config.global.createSSRApp = (comp) => {
  const app = createApp(comp);
  app.config.globalProperties.$route = {};
  app.use(TDesign);
  return renderToString(app);
};
