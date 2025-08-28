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

  /* swiper 组件示例展示 */
  .tdesign-demo-block--swiper .demo-item {
    display: flex;
    height: 280px;
    background-color: #4b5b76;
    color: #fff;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
  }

  /* grid 组件示例展示 */
  .tdesign-demo-item--grid .t-col > div {
    min-height: 40px;
    margin-top: 8px;
    margin-bottom: 8px;
    background: #366ef4;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }

  .tdesign-demo-item--grid .t-col:nth-of-type(2n) > div {
    background: #8eabff;
  }
`;

export const stackblitzRc = `
  {
    "installDependencies": false,
    "startCommand": "pnpm install && pnpm dev"
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

export const packageJSONContent = JSON.stringify(
  {
    name: 'tdesign-vue-next-demo',
    version: '0.0.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'vite build',
      serve: 'vite preview',
    },
    dependencies: {
      vue: TD_SITE_METADATA.dependencies.vue,
      less: TD_SITE_METADATA.dependencies.less,
      'tdesign-vue-next': TD_SITE_METADATA.dependencies['tdesign-vue-next'],
      'tdesign-icons-vue-next': TD_SITE_METADATA.dependencies['tdesign-icons-vue-next'],
      dayjs: TD_SITE_METADATA.dependencies.dayjs,
    },
    devDependencies: {
      vite: TD_SITE_METADATA.devDependencies.vite,
      '@vue/compiler-sfc': TD_SITE_METADATA.devDependencies['@vue/compiler-sfc'],
      '@vitejs/plugin-vue': TD_SITE_METADATA.devDependencies['@vitejs/plugin-vue'],
      '@vitejs/plugin-vue-jsx': TD_SITE_METADATA.devDependencies['@vitejs/plugin-vue-jsx'],
    },
  },
  null,
  2,
);
