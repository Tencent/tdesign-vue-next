import orgPkg from '../../../../package.json';

export const htmlContent = `<div id="app"></div>`;

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

export const pkgContent = JSON.stringify(
  {
    name: 'tdesign-vue-next-demo',
    version: '0.1.0',
    private: true,
    scripts: {
      serve: 'vue-cli-service serve',
      build: 'vue-cli-service build',
      lint: 'vue-cli-service lint',
    },
    dependencies: {
      'core-js': '^3.8.3',
      vue: '^3.2.31',
      'tdesign-vue-next': orgPkg.version,
      'tdesign-icons-vue-next': orgPkg.dependencies['tdesign-icons-vue-next'],
    },
    devDependencies: {
      less: '^4.1.2',
      eslint: '^7.32.0',
      '@vue/compiler-sfc': '^3.2.31',
      'less-loader': '^10.2.0',
      'eslint-plugin-vue': '^8.0.3',
      '@babel/core': '^7.12.16',
      '@babel/eslint-parser': '^7.12.16',
      '@vue/cli-plugin-babel': '~5.0.1',
      '@vue/cli-plugin-eslint': '~5.0.1',
      '@vue/cli-service': '~5.0.1',
    },
    eslintConfig: {
      root: true,
      env: {
        node: true,
      },
      extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
      parserOptions: {
        parser: '@babel/eslint-parser',
      },
      rules: {},
    },
    browserslist: ['> 1%', 'last 2 versions', 'not dead', 'not ie 11'],
  },
  null,
  2,
);

export const babelContent = `
  module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset'
    ]
  }
`;

export const vueConfigContent = `
  const { defineConfig } = require('@vue/cli-service')

  module.exports = defineConfig({
    transpileDependencies: true
  })
`;
