import { joinComponentsRoot, joinPosix, joinTdesignVueNextRoot } from '@tdesign/internal-utils';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

import { VitePWA } from 'vite-plugin-pwa';
import pwaConfig from './configs/pwa';

import changelog2Json from './plugins/changelog-to-json';
import tdDocToVue from './plugins/td-doc-to-vue';
import siteMetadata from './plugins/site-metadata';

// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

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
    plugins: [vue(), vueJsx(), tdDocToVue(), changelog2Json(), siteMetadata(), VitePWA(pwaConfig)],
  };
});
