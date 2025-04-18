import { execSync } from 'child_process';
import { resolve } from 'path';
import { rmSync, writeFileSync, readFileSync } from 'fs';

const projectName = 'tdesign-vue-next-demo';

execSync(`pnpm create vite ${projectName} --template vue-ts`);

const mainFilePath = `${projectName}/src/main.ts`;
const appFilePath = `${projectName}/src/App.vue`;
const componentsFolders = `${projectName}/src/components`;
const packageJsonPath = `${projectName}/package.json`;

const mainJsContent = `
  import { createApp } from 'vue';
  import TDesign from 'tdesign-vue-next';
  import App from './App.vue';

  // 引入组件库全局样式资源
  import 'tdesign-vue-next/es/style/index.css';

  const app = createApp(App);

  app.use(TDesign).mount('#app');
`;
const appVueContent = `
<template>
  <t-button>按钮</t-button>
</template>
`;

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
packageJson.dependencies = {
  ...packageJson.dependencies,
  'tdesign-vue-next': 'latest',
};

writeFileSync(mainFilePath, mainJsContent, 'utf8');
writeFileSync(appFilePath, appVueContent, 'utf8');
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

const projectPath = resolve(componentsFolders);
rmSync(projectPath, { recursive: true, force: true });
