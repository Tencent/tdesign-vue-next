export const htmlContent = `
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
`;

export const mainJsContent = `
  import { createApp } from 'vue';
  import TDesign from 'tdesign-vue-next';
  import Demo from './demo.vue';

  // 引入组件库全局样式资源
  import 'tdesign-vue-next/es/style/index.css';
  import './index.css';

  const app = createApp(Demo);

  app.use(TDesign).mount('#app');
`;

export const styleContent = `
  /* 竖排展示 demo 行间距 16px */
  .tdesign-demo-block-column {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  /* 竖排展示 demo 行间距 32px */
  .tdesign-demo-block-column-large {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
  }

  /* 横排排展示 demo 列间距 16px */
  .tdesign-demo-block-row {
    display: flex;
    column-gap: 16px;
    align-items: center;
  }
`;

export const stackblitzRc = `
  {
    "installDependencies": true,
    "startCommand": "npm run dev"
  }
`;

export const viteConfigContent = `
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
});
`;

export const packageJSON = {
  name: 'tdesign-vue-next-demo',
  version: '0.0.0',
  private: true,
  scripts: {
    dev: 'vite',
    build: 'vite build',
    serve: 'vite preview',
  },
  dependencies: {
    vue: '^3.2.31',
  },
  devDependencies: {
    vite: '^2.8.4',
    '@vitejs/plugin-vue-jsx': '^1.3.7',
    '@vitejs/plugin-vue': '^2.2.2',
    '@vue/compiler-sfc': '^3.2.31',
  },
};
