import { config } from '@vue/test-utils';
import { createApp } from 'vue';
import { renderToString } from '@vue/server-renderer';
import TDesign from '@/src/index';

config.global.plugins = [TDesign];

config.global.createSSRApp = (comp) => {
  const app = createApp(comp);
  app.config.globalProperties.$route = {};
  app.use(TDesign);
  const html = renderToString(app);
  return html;
};
