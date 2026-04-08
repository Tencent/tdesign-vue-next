import { createApp } from 'vue';
import TDesign from '@tdesign/components';
import TDesignChat from '@tdesign/pro-components-chat';

import App from './app.vue';
import router from './routes';

import Stackblitz from './components/stackblitz/index.vue';
import NewWindow from './components/newWindow/index.vue';
import BaseUsage from './components/base-usage.vue';

// import tdesign style
import '@tdesign/components/style/index.js';
import '@tdesign/common-style/web/docs.less';

// import site webComponents
import '@tdesign/site-components';
import '@tdesign/site-components/lib/styles/style.css';
import '@tdesign/site-components/lib/styles/prism-theme.less';
import '@tdesign/site-components/lib/styles/prism-theme-dark.less';

import '@tdesign/theme-generator';

import { registerLocaleChange } from '@tdesign/site-components';

registerLocaleChange();

const app = createApp(App);

app.component('Stackblitz', Stackblitz);
app.component('NewWindow', NewWindow);
app.component('BaseUsage', BaseUsage);

app.use(TDesign).use(TDesignChat).use(router).mount('#app');
