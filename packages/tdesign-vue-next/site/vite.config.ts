import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import tdDocToVue from './plugins/td-doc-to-vue';
import pwaConfig from './configs/pwa';
import path from 'path';

const publicPathMap: Record<string, string> = {
  preview: '/',
  intranet: '/vue-next/',
  production: 'https://static.tdesign.tencent.com/vue-next/',
};

export default defineConfig(({ mode }) => {
  return {
    base: publicPathMap[mode],
    server: {
      port: 17000,
      open: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    plugins: [vue(), vueJsx(), tdDocToVue(), VitePWA(pwaConfig)],
  };
});
