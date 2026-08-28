import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { joinComponentsRoot, joinPackagesRoot, joinTdesignVueNextRoot } from '@tdesign/internal-utils';

export default defineConfig({
  resolve: {
    alias: {
      'tdesign-vue-next/es': joinComponentsRoot(),
      'tdesign-vue-next': joinComponentsRoot(),
    },
  },
  plugins: [vue(), vueJsx()],
  test: {
    include:
      process.env.NODE_ENV === 'test-snap'
        ? [await joinTdesignVueNextRoot('test/unit/snap/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')]
        : [await joinComponentsRoot('**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')],
    globals: true,
    environment: 'jsdom',
    testTimeout: 5000,
    setupFiles: process.env.TEST_TARGET === 'snap' ? './src/setup.ts' : '',
    css: {
      // 单测中 getComputedStyle 需要
      include: /menu\/_index\.less$/,
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      allowExternal: true,
      reportOnFailure: true,
      include: [await joinComponentsRoot(), await joinPackagesRoot('shared/hooks')],
    },
  },
});
