import { createApp } from 'vue';
import TDesign from '@tencent/tdesign-vue-next';
import App from './pages/app.vue';
import router from './routes';

import codesandbox from './components/codesandbox/index.vue';

// import tdesign style
import '@common/style/web/index.less';
import '@common/style/web/docs.less';

// import site webcomponents
import 'tdesign-site-components';
import 'tdesign-site-components/lib/styles/style.css';

const app = createApp(App);

app.component('Codesandbox', codesandbox);

app.use(TDesign).use(router).mount('#app');
