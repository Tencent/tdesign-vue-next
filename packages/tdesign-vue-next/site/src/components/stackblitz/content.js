import { tdesignVueNextPackageJson, tdesignVueNextSitePackageJson } from '@tdesign/internal-utils/package-json';

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
      vue: tdesignVueNextSitePackageJson.dependencies.vue,
      less: tdesignVueNextSitePackageJson.devDependencies.less,
      'tdesign-vue-next': tdesignVueNextPackageJson.version,
      'tdesign-icons-vue-next': tdesignVueNextPackageJson.dependencies['tdesign-icons-vue-next'],
    },
    devDependencies: {
      vite: tdesignVueNextSitePackageJson.devDependencies.vite,
      '@vue/compiler-sfc': tdesignVueNextSitePackageJson.devDependencies['@vue/compiler-sfc'],
      '@vitejs/plugin-vue': tdesignVueNextSitePackageJson.devDependencies['@vitejs/plugin-vue'],
      '@vitejs/plugin-vue-jsx': tdesignVueNextSitePackageJson.devDependencies['@vitejs/plugin-vue-jsx'],
    },
  },
  null,
  2,
);
