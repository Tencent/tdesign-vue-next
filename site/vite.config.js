import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import codeRaw from './plugin-tdoc/code-raw';
import createTDesignPlugin from './plugin-tdoc';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import pwaConfig from './pwaConfig';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue-next/' : './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../'),
      '@common': path.resolve(__dirname, '../src/_common'),
      '@tencent/tdesign-vue-next': path.resolve(__dirname, '../src'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 17000,
    open: '/',
    https: false,
    fs: {
      allow: ['..']
    },
  },
  build: {
    outDir: '../_site',
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('td-')
        }
      }
    }),
    vueJsx(),
    codeRaw({
      fileRegex: /\.code$/
    }),
    createTDesignPlugin(),
    VitePWA(pwaConfig),
  ]
});
