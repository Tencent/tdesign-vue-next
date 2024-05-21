import * as path from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const isCustomElement = tag => tag.startsWith('td-') || tag.startsWith('tdesign-theme');

export const resolveConfig = {
  alias: {
    '@': path.resolve(__dirname, '../'),
    '@test': path.resolve(__dirname, '../test'),
    '@/src': path.resolve(__dirname, '../src/'),
    '@common': path.resolve(__dirname, '../src/_common'),
    'tdesign-vue-next/es': path.resolve(__dirname, '../src'),
    'tdesign-vue-next': path.resolve(__dirname, '../src'),
  },
};

export const basePlugin = [
  [
    vue({
      ssr: false,
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
];
