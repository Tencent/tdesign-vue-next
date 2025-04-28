import { execSync } from 'child_process';
import { resolve, join } from 'path';
import { rmSync, writeFileSync, readFileSync, mkdirSync, existsSync } from 'fs';

// 常量定义
const PUBLIC_PATH = 'design-vue-next-demo';
const PROJECT_NAMES = {
  VUE_TS: 'tdesign-vue-next-vue-ts',
  VUE_TSX: 'tdesign-vue-next-vue-tsx',
};

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
      plugins: [vue(), vueJsx()]
    });
  `,
};

// 创建公共目录
function createPublicDirectory() {
  if (!existsSync(PUBLIC_PATH)) {
    mkdirSync(PUBLIC_PATH);
  }
}

// 构建示例项目
function buildExample(projectName, extraDeps = {}) {
  // 创建项目
  execSync(`pnpm create vite ${projectName} --template vue-ts`, {
    cwd: resolve(PUBLIC_PATH),
    stdio: 'inherit',
  });

  const projectPath = join(PUBLIC_PATH, projectName);
  const paths = {
    main: join(projectPath, 'src/main.ts'),
    app: join(projectPath, 'src/App.vue'),
    demo: join(projectPath, 'src/Demo.vue'),
    packageJson: join(projectPath, 'package.json'),
    helloWorld: join(projectPath, 'src/components/HelloWorld.vue'),
    viteConfig: join(projectPath, 'vite.config.ts'),
  };

  // 处理 package.json
  const packageJson = JSON.parse(readFileSync(paths.packageJson, 'utf8'));
  packageJson.dependencies = {
    ...packageJson.dependencies,
    'tdesign-vue-next': 'latest',
    'tdesign-icons-vue-next': 'latest',
    ...extraDeps,
  };

  // 删除默认组件
  if (existsSync(paths.helloWorld)) {
    rmSync(paths.helloWorld);
  }

  // 写入文件
  writeFileSync(paths.main, TEMPLATES.MAIN_TS.trim());
  writeFileSync(paths.app, TEMPLATES.APP_VUE.trim());
  writeFileSync(paths.demo, TEMPLATES.DEMO_VUE.trim());
  writeFileSync(paths.packageJson, JSON.stringify(packageJson, null, 2));

  if (projectName === PROJECT_NAMES.VUE_TSX) {
    writeFileSync(paths.viteConfig, TEMPLATES.VITE_CONFIG_TS.trim());
  }
}

try {
  createPublicDirectory();
  buildExample(PROJECT_NAMES.VUE_TS);
  buildExample(PROJECT_NAMES.VUE_TSX, {
    '@vitejs/plugin-vue-jsx': 'latest',
  });
} catch (error) {
  console.error('构建过程中发生错误:', error);
  process.exit(1);
}
