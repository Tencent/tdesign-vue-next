import { execSync } from 'child_process';
import { join } from 'path';
import { rmSync, writeFileSync, readFileSync, existsSync } from 'fs';

// 常量定义
const PROJECT_NAME = 'tdesign-vue-next-demo';

// 文件模板
const TEMPLATES = {
  MAIN_TS: `
import { createApp } from 'vue';
import TDesign from 'tdesign-vue-next';
import App from './App.vue';
import 'tdesign-vue-next/es/style/index.css';

const app = createApp(App);
app.use(TDesign).mount('#app');

  `,
  APP_VUE: `
<template>
  <t-config-provider :global-config="zh_CN">
    <Demo />
  </t-config-provider>
</template>

<script setup lang="ts">
import zh_CN from 'tdesign-vue-next/es/locale/zh_CN';
import Demo from "./Demo.vue";
</script>

  `,
  DEMO_VUE: `
<template>
  <t-button>按钮</t-button>
</template>

  `,
  VITE_CONFIG_TS: `
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
});

  `,
};

// 构建示例项目
function buildExample(projectName, extraDeps = {}) {
  execSync(`pnpm create vite ${projectName} --template vue-ts`, { stdio: 'inherit' });

  const projectPath = join(process.cwd(), projectName);
  const paths = {
    main: join(projectPath, 'src/main.ts'),
    app: join(projectPath, 'src/App.vue'),
    demo: join(projectPath, 'src/Demo.vue'),
    packageJson: join(projectPath, 'package.json'),
    helloWorld: join(projectPath, 'src/components/HelloWorld.vue'),
    viteConfig: join(projectPath, 'vite.config.ts'),
  };

  // 更新 package.json
  const pkg = JSON.parse(readFileSync(paths.packageJson, 'utf8'));
  pkg.dependencies = {
    ...pkg.dependencies,
    'tdesign-vue-next': 'latest',
    'tdesign-icons-vue-next': 'latest',
    ...extraDeps,
  };

  writeFileSync(paths.packageJson, JSON.stringify(pkg, null, 2));

  // 删除默认组件
  if (existsSync(paths.helloWorld)) {
    rmSync(paths.helloWorld);
  }

  // 写入示例代码
  writeFileSync(paths.main, TEMPLATES.MAIN_TS.trim());
  writeFileSync(paths.app, TEMPLATES.APP_VUE.trim());
  writeFileSync(paths.demo, TEMPLATES.DEMO_VUE.trim());
  writeFileSync(paths.viteConfig, TEMPLATES.VITE_CONFIG_TS.trim());
}

try {
  buildExample(PROJECT_NAME, {
    '@vitejs/plugin-vue-jsx': 'latest',
  });
} catch (error) {
  console.error('构建过程中发生错误:', error);
  process.exit(1);
}
