import * as path from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

import TDocPlugin from './plugin-doc';
import PWA from './configs/pwaConfig';

const workspaceRoot = searchForWorkspaceRoot(process.cwd());
const getRootPath = (...args: string[]) => path.posix.resolve(workspaceRoot, ...args);

export function resolveAlias(vueVersion: number) {
  return [
    { find: '@', replacement: path.resolve(__dirname) },
    { find: '@adapter/vue', replacement: getRootPath(`packages/adapter/vue/vue${vueVersion}`) },
    { find: '@adapter/hooks', replacement: getRootPath(`packages/adapter/hooks/vue${vueVersion}`) },
    { find: '@adapter/utils', replacement: getRootPath(`packages/adapter/utils/vue${vueVersion}`) },
    { find: /^@td\/components\/(.+)/, replacement: getRootPath(`packages/tdesign-vue${vueVersion === 3 ? '-next' : ''}/src/$1`) },
    { find: /^@td\/components$/, replacement: getRootPath(`packages/tdesign-vue${vueVersion === 3 ? '-next' : ''}`) },
    { find: 'tdesign-vue-next/es/locale', replacement: getRootPath(`packages/components/locale/src`) },
  ];
}

const publicPathMap = {
  preview: '/',
  intranet: '/vue-next/',
  production: 'https://static.tdesign.tencent.com/vue-next/',
};

// ! vue-next 中是从 ../script/vite.base.config 引入
const isCustomElement = tag => tag.startsWith('td-') || tag.startsWith('tdesign-theme');

export default defineConfig(({ mode }) => {
  return {
    base: publicPathMap[mode],
    resolve: {
      alias: resolveAlias(3),
    },
    server: {
      host: '0.0.0.0',
      port: 17000,
      open: '/',
      fs: {
        allow: ['..'],
      },
    },
    plugins: [
      VitePWA(PWA),
      TDocPlugin(),
      vue({
        template: {
          compilerOptions: {
            isCustomElement,
          },
        },
      }),
      vueJsx({
        isCustomElement,
      }),
    ],
    optimizeDeps: {
      include: ['prismjs', 'prismjs/components/prism-bash.js'],
    },
  };
});
