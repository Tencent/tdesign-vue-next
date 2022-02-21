import orgPkg from '../../../../package.json';

export const pkgContent = JSON.stringify(
  {
    name: 'tdesign-vue-next-demo',
    version: '0.0.1',
    scripts: {
      dev: 'vite',
    },
    dependencies: {
      'tdesign-vue-next': orgPkg.version,
      'tdesign-icons-vue-next': orgPkg.dependencies['tdesign-icons-vue-next'],
      vue: orgPkg.devDependencies.vue,
    },
    devDependencies: {
      '@vitejs/plugin-vue': orgPkg.devDependencies['@vitejs/plugin-vue'],
      '@vitejs/plugin-vue-jsx': orgPkg.devDependencies['@vitejs/plugin-vue-jsx'],
      vite: orgPkg.devDependencies.vite,
    },
  },
  null,
  2,
);

export const orgJsContent = `
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import Demo from './demo.vue';

import 'tdesign-vue-next/dist/tdesign.css';
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

export const viteConfigContent = `
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()]
});
`;

export const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>TDesign Web Vue Next</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
`;
