import { tdesignVueNextPackageJson, tdesignVueNextSitePackageJson } from '@tdesign/internal-utils/package-json';

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

export const packageJSONContent = (name) => {
  return {
    name: name,
    dependencies: {
      vue: tdesignVueNextSitePackageJson.dependencies.vue,
      less: tdesignVueNextSitePackageJson.devDependencies.less,
      'tdesign-vue-next': tdesignVueNextPackageJson.version,
      'tdesign-icons-vue-next': tdesignVueNextPackageJson.dependencies['tdesign-icons-vue-next'],
    },
    devDependencies: {
      '@vue/cli-plugin-babel': '~4.5.0',
    },
  };
};
