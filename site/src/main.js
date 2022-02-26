import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './app.vue';
import router from './routes';

import Stackblitz from './components/stackblitz/index.vue';

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

const app = createApp(App);

app.component('Stackblitz', Stackblitz);

app.use(TDesign).use(router).mount('#app');
