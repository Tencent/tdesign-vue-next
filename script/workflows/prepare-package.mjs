import { execSync } from 'child_process';
import { resolve } from 'path';
import { rmSync, writeFileSync, readFileSync } from 'fs';

const projectName = 'tdesign-vue-next-demo';

execSync(`pnpm create vite ${projectName} --template vue-ts`);

const mainFilePath = `${projectName}/src/main.ts`;
const appFilePath = `${projectName}/src/App.vue`;
const demoFilePath = `${projectName}/src/Demo.vue`;
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
  <t-config-provider :global-config="zh_CN">
    <Demo />
  </t-config-provider>
</template>
<script setup lang="ts">
import zh_CN from 'tdesign-vue-next/es/locale/zh_CN';
import Demo from "./Demo.vue";
</script>
`;
const demoVueContent = `
<template>
  <t-button>按钮</t-button>
</template>
`;

const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));
packageJson.dependencies = {
  ...packageJson.dependencies,
  'tdesign-vue-next': 'latest',
  'tdesign-icons-vue-next': 'latest',
};

writeFileSync(mainFilePath, mainJsContent, 'utf8');
writeFileSync(appFilePath, appVueContent, 'utf8');
writeFileSync(demoFilePath, demoVueContent, 'utf8');
writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

/** remove extra code  */
const componentsFolders = `${projectName}/src/components`;
const projectPath = resolve(componentsFolders);
rmSync(projectPath, { recursive: true, force: true });
