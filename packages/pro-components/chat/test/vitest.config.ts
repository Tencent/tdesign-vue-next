import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const currentDir = dirname(fileURLToPath(import.meta.url));
// packages/pro-components/chat/test -> packages/pro-components/chat
const chatRoot = resolve(currentDir, '..');
const packagesRoot = resolve(chatRoot, '../../');
const workspaceRoot = resolve(packagesRoot, '..');
const componentsRoot = resolve(packagesRoot, 'components');

const joinProComponentsChatRoot = (...paths: string[]) => resolve(chatRoot, ...paths);
const joinWorkspaceRoot = (...paths: string[]) => resolve(workspaceRoot, ...paths);
const joinPackagesRoot = (...paths: string[]) => resolve(packagesRoot, ...paths);

/**
 * chat 组件（pro-components/chat）独立测试工程。
 *
 * 之所以独立：仓库根 vitest 仅收集 packages/*\/test/vitest.config.ts，
 * 而 tdesign-vue-next 的 include 只覆盖 packages/components，
 * chat 位于 packages/pro-components/chat，此前没有任何用例被执行到。
 */
export default defineConfig({
  resolve: {
    alias: [
      {
        find: 'tdesign-vue-next/es',
        replacement: componentsRoot,
      },
      {
        find: 'tdesign-vue-next',
        replacement: componentsRoot,
      },
      {
        find: '@tdesign-vue-next/chat',
        replacement: chatRoot,
      },
      {
        find: '@common',
        replacement: joinPackagesRoot('common'),
      },
      // omi-vueify 的 package.json exports 缺少 "." 条件，vite 无法解析入口，这里显式指向 esm 产物。
      // 迁移到纯 Vue 实现后该 alias 可直接移除，用例不感知。
      {
        find: /^omi-vueify$/,
        replacement: resolve(workspaceRoot, 'node_modules/omi-vueify/dist/omi-vueify.es.js'),
      },
    ],
  },
  define: {
    PKG_VERSION: JSON.stringify('0.0.0-test'),
  },
  plugins: [vue(), vueJsx()],
  test: {
    name: 'chat',
    include: [joinProComponentsChatRoot('__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')],
    exclude: [joinWorkspaceRoot('**/node_modules/**'), joinWorkspaceRoot('**/_example/**')],
    globals: true,
    environment: 'jsdom',
    testTimeout: 10000,
    setupFiles: [joinProComponentsChatRoot('test/setup.ts')],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      allowExternal: true,
      reportOnFailure: true,
      include: [joinProComponentsChatRoot()],
    },
  },
});
