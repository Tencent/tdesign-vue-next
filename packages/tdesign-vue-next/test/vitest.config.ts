import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { joinComponentsRoot, joinTdesignVueNextRoot } from '@tdesign/internal-utils';

export default defineConfig({
  resolve: {
    alias: {
      // TODO: paopao 为什么还需要 alias，因为在 example 中的写法只能是 tdesign-vue-next，虽然有这个子应用，但没有 build 是没用的，同时即便是 prebuild 了，hmr 也是问题
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
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      allowExternal: true,
      reportOnFailure: true,
      include: [await joinComponentsRoot()],
    },
  },
});
