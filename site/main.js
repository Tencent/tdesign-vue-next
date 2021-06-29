import { createApp } from 'vue';
import App from './app.vue';
import router from './routes';
import TDesign from '@src';

// import tdesign style
import '@common/style/web/index.less';
import '@common/style/web/docs.less';

// import site webcomponents
import '@common/site/lib/site.es.js';
import '@common/site/lib/style.css';

const app = createApp(App);

app.use(TDesign).use(router).mount('#app');