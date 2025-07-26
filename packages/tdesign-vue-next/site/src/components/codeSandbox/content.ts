import { catalogs } from '@tdesign/internal-utils/catalogs';
import { tdesignVueNextPackageJson } from '@tdesign/internal-utils/package-json';

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

export const packageJSONContent = (name: string) => {
  return {
    name: name,
    dependencies: {
      vue: catalogs.deps.vue,
      less: catalogs.bundle.less,
      'tdesign-vue-next': tdesignVueNextPackageJson.version,
      'tdesign-icons-vue-next': catalogs.tdesign['tdesign-icons-vue-next'],
    },
    devDependencies: {
      '@vue/cli-plugin-babel': '~4.5.0',
    },
  };
};
