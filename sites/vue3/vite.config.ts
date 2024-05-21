import * as path from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

import TDocPlugin from './plugins/doc';
import PWA from './configs/pwa';

const workspaceRoot = searchForWorkspaceRoot(process.cwd());
const getRootPath = (...args: string[]) => path.posix.resolve(workspaceRoot, ...args);

function resolveAlias(vueVersion: number) {
  return {
    '@adapter/vue': getRootPath(`packages/adapter/vue/vue${vueVersion}`),
    '@adapter/hooks': getRootPath(`packages/adapter/hooks/vue${vueVersion}`),
    '@adapter/utils': getRootPath(`packages/adapter/utils/vue${vueVersion}`),
    '@td/intel': getRootPath(`packages/intel/vue${vueVersion}/src`),
    '@td/components': getRootPath(`packages/components/vue${vueVersion}`),
    'tdesign-vue-next/es/locale': getRootPath(`packages/components/locale/src`),
    // 'tdesign-vue-next': getRootPath(`packages/components/vue${vueVersion}`),
  };
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
      alias: {
        '@': path.resolve(__dirname),
        ...resolveAlias(3),
      },
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
    // optimizeDeps: {
    //   include: ['prismjs', 'prismjs/components/prism-bash.js', 'tdesign-icons-vue-next', 'dayjs'],
    // },
  };
});
