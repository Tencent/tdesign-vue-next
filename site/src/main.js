import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './app.vue';
import router from './routes';

import Stackblitz from './components/stackblitz/index.vue';
import BaseUsage from './components/base-usage.vue';

// import tdesign style
import 'tdesign-vue-next/style/index.js';
import '@common/style/web/docs.less';

// import site webComponents
import 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/style.css';
import 'tdesign-site-components/lib/styles/prism-theme.less';
import 'tdesign-site-components/lib/styles/prism-theme-dark.less';

// import icons webcomponents
import 'tdesign-icons-view';

import 'tdesign-theme-generator';

const app = createApp(App);

app.component('Stackblitz', Stackblitz);
app.component('BaseUsage', BaseUsage);

app.use(TDesign).use(router).mount('#app');
