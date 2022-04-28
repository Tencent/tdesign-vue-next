import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';

import tDocPlugin from './plugin-doc';
import pwaConfig from './pwaConfig';

const publicPathMap = {
  preview: '/',
  intranet: '/vue-next/',
  production: 'https://static.tdesign.tencent.com/vue-next/',
};

export default ({ mode }) => {
  return defineConfig({
    base: publicPathMap[mode],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../'),
        '@common': path.resolve(__dirname, '../src/_common'),
        'tdesign-vue-next/es': path.resolve(__dirname, '../src'),
        'tdesign-vue-next': path.resolve(__dirname, '../src'),
      },
    },
    server: {
      host: '127.0.0.1',
      port: 17000,
      open: '/',
      https: false,
      fs: {
        allow: ['..'],
      },
    },
    build: {
      outDir: '../_site',
    },
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.startsWith('td-'),
          },
        },
      }),
      vueJsx({
        isCustomElement: (tag) => tag.startsWith('td-'),
      }),
      tDocPlugin(),
      VitePWA(pwaConfig),
    ],
  });
};
