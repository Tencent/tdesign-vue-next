import { createApp } from 'vue';
import Demo from './demo.vue';

import TDesign from 'tdesign-vue-next';
import 'tdesign-vue-next/dist/tdesign.css';
import './index.css';

const app = createApp(Demo);

app.use(TDesign).mount('#app');
