// ! todo
import orgPkg from '../../../package.json';

export const htmlContent = `
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
`;

export const mainJsContent = `
  import Vue from 'vue';
  import TDesign from 'tdesign-vue';

  // 引入组件库全局样式资源
  import 'tdesign-vue/es/style/index.css';
  import './index.css';
  import Demo from './demo.vue';

  Vue.use(TDesign);
  Vue.config.productionTip = false;

  new Vue({
    render: (h) => h(Demo),
  }).$mount('#app');
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
    "installDependencies": false,
    "startCommand": "turbo && turbo dev"
  }
`;

export const viteConfigContent = `
  import { defineConfig } from 'vite';
  import { createVuePlugin } from 'vite-plugin-vue2';

  export default defineConfig({
    plugins: [
      createVuePlugin({ jsx: true }),
    ],
  });
`;

export const viteConfigContentForComposition = `
  import { defineConfig } from 'vite';
  import vue from '@vitejs/plugin-vue2'
  import vueJsx from '@vitejs/plugin-vue2-jsx';

  export default defineConfig({
    plugins: [
      vue(),
      vueJsx()
    ],
  });
`;

export const packageJSONContent = JSON.stringify(
  {
    name: 'tdesign-vue-demo',
    version: '0.0.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'vite build',
      serve: 'vite preview',
    },
    dependencies: {
      'tdesign-vue': orgPkg.version,
      'tdesign-icons-vue': orgPkg.dependencies['tdesign-icons-vue'],
      vue: orgPkg.devDependencies.vue,
    },
    devDependencies: {
      vite: orgPkg.devDependencies.vite,
      less: orgPkg.devDependencies.less,
      'vite-plugin-vue2': orgPkg.devDependencies['vite-plugin-vue2'],
      'vue-template-compiler': orgPkg.devDependencies['vue-template-compiler'],
    },
  },
  null,
  2,
);

export const packageJSONContentForComposition = JSON.stringify(
  {
    name: 'tdesign-vue-demo',
    version: '0.0.0',
    private: true,
    scripts: {
      dev: 'vite',
      build: 'vite build',
      serve: 'vite preview',
    },
    dependencies: {
      'tdesign-vue': orgPkg.version + '-naruto',
      'tdesign-icons-vue': orgPkg.dependencies['tdesign-icons-vue'],
      vue: '2.7.14',
    },
    devDependencies: {
      vite: '^2.9.6',
      less: orgPkg.devDependencies.less,
      '@vitejs/plugin-vue2': '^1.1.2',
      'vue-template-compiler': '2.7.14',
      '@vitejs/plugin-vue2-jsx': '^1.1.0',
    },
  },
  null,
  2,
);
