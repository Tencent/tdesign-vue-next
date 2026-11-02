import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const currentDir = dirname(fileURLToPath(import.meta.url));
const chatRoot = resolve(currentDir, '../../pro-components/chat');
const packagesRoot = resolve(chatRoot, '../../');
const workspaceRoot = resolve(packagesRoot, '..');
const componentsRoot = resolve(packagesRoot, 'components');

// Vitest glob patterns use forward slashes on every platform.
const joinProComponentsChatRoot = (...paths: string[]) =>
  resolve(chatRoot, ...paths)
    .split(sep)
    .join('/');
const joinWorkspaceRoot = (...paths: string[]) =>
  resolve(workspaceRoot, ...paths)
    .split(sep)
    .join('/');
const joinPackagesRoot = (...paths: string[]) =>
  resolve(packagesRoot, ...paths)
    .split(sep)
    .join('/');

// One Chat project covers component and public hook tests.
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
    name: '@tdesign/vue-next-chat-test',
    include: [joinProComponentsChatRoot('**/__tests__/*.{test,spec}.{js,jsx,ts,tsx}')],
    exclude: [joinWorkspaceRoot('**/node_modules/**'), joinWorkspaceRoot('**/_example/**')],
    globals: true,
    environment: 'jsdom',
    server: {
      deps: {
        // Resolve extensionless imports in webc dependencies through Vite, including SSR tests.
        inline: ['@tdesign/web-components', '@tdesign/web-components-chat', 'tdesign-icons-web-components'],
      },
    },
    testTimeout: 10000,
    setupFiles: [joinProComponentsChatRoot('test/setup.ts')],
  },
});
