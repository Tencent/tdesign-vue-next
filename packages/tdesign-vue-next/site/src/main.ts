import { createApp } from 'vue';
import TDesign from '@tdesign/components';
import App from './App.vue';
import router from './router';

import Stackblitz from './components/stackblitz/index.vue';
import CodeSandbox from './components/codeSandbox/index.vue';
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
// @ts-ignore
import { registerLocaleChange } from '@tdesign/site-components';

registerLocaleChange();

const app = createApp(App);

app.component('Stackblitz', Stackblitz);
app.component('CodeSandbox', CodeSandbox);
app.component('NewWindow', NewWindow);
app.component('BaseUsage', BaseUsage);

// @ts-ignore TODO
app.use(TDesign).use(router).mount('#app');
