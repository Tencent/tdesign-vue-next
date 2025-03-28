import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

const isCustomElement = (tag) => tag.startsWith('td-') || tag.startsWith('tdesign-theme');

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
