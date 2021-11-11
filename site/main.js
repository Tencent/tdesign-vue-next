import { createApp } from 'vue';
import App from './app.vue';
import router from './routes';
import TDesign from '@tencent/tdesign-vue-next';

import codesandbox from './components/codesandbox/index.vue';

// import tdesign style
import '@common/style/web/index.less';
import '@common/style/web/docs.less';

// import site webcomponents
import '@common/site/lib/site.es.js';
import '@common/site/src/styles/main.less';

const app = createApp(App);

app.component('codesandbox', codesandbox)

app.use(TDesign).use(router).mount('#app');
