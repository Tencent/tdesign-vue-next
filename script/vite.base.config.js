import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const isCustomElement = (tag) => tag.startsWith('td-') || tag.startsWith('tdesign-theme');

export const resolveConfig = {
  alias: {
    '@': path.resolve(__dirname, '../'),
    '@test': path.resolve(__dirname, '../test'),
    '@src': path.resolve(__dirname, '../packages/components/'),
    '@common': path.resolve(__dirname, '../packages/components/_common'),
    'tdesign-vue-next/es': path.resolve(__dirname, '../packages/components'),
    'tdesign-vue-next': path.resolve(__dirname, '../packages/components'),
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
