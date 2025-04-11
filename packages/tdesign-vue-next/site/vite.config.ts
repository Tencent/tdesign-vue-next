import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import tdDocToVue from './plugins/td-doc-to-vue';
import pwaConfig from './configs/pwa';
import { resolve, resolveComponentsRoot, resolveTdesignVueNextRoot } from '@tdesign/internal-utils';

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
        '@': resolve(__dirname, './'),
        '@tdesign/vue-next': resolveTdesignVueNextRoot(),
        '@tdesign/components': resolveComponentsRoot(),
        // TODO: paopao 为什么还需要 alias，因为在 example 中的写法只能是 tdesign-vue-next，虽然有这个子应用，但没有 build 是没用的，同时即便是 prebuild 了，hmr 也是问题
        'tdesign-vue-next/es': resolveComponentsRoot(),
        'tdesign-vue-next': resolveComponentsRoot(),
      },
    },
    plugins: [vue(), vueJsx(), tdDocToVue(), VitePWA(pwaConfig)],
  };
});
