import { createApp } from 'vue';
import TDesign from '@tencent/tdesign-vue-next';
import App from './app.vue';
import router from './routes';

import codeSandbox from './components/code-sandbox/index.vue';

// import tdesign style
import '@common/style/web/index.less';
import '@common/style/web/docs.less';

// import site webComponents
import 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/style.css';

const app = createApp(App);

app.component('CodeSandbox', codeSandbox);

app.use(TDesign).use(router).mount('#app');
