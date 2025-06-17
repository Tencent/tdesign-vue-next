import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import tdDocToVue from './plugins/td-doc-to-vue';
import changelog2Json from './plugins/changelog-to-json';
import pwaConfig from './configs/pwa';
import { joinPosix, joinComponentsRoot, joinTdesignVueNextRoot } from '@tdesign/internal-utils';

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
      host: '0.0.0.0',
      open: true,
    },
    resolve: {
      alias: {
        '@': joinPosix(__dirname, './'),
        '@tdesign/vue-next': joinTdesignVueNextRoot(),
        '@tdesign/components': joinComponentsRoot(),
        'tdesign-vue-next/es': joinComponentsRoot(),
        'tdesign-vue-next': joinComponentsRoot(),
      },
    },
    plugins: [vue(), vueJsx(), tdDocToVue(), changelog2Json(), VitePWA(pwaConfig)],
  };
});
