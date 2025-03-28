import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolveComponentsRoot, resolveTdesignVueNextRoot } from '@tdesign/internal-utils';

export default defineConfig({
  resolve: {
    // 做法 1，在 test 之前先 build 一次 es
    // 做法 2，用 alias
    alias: {
      'tdesign-vue-next/es': resolveComponentsRoot(),
      'tdesign-vue-next': resolveComponentsRoot(),
    },
  },
  plugins: [vue(), vueJsx()],
  test: {
    include:
      process.env.NODE_ENV === 'test-snap'
        ? [await resolveTdesignVueNextRoot('test/unit/snap/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')]
        : [await resolveComponentsRoot('**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')],
    globals: true,
    environment: 'jsdom',
    testTimeout: 5000,
    setupFiles: process.env.NODE_ENV === 'test-snap' ? './unit/test-setup.js' : '',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      allowExternal: true,
      include: [await resolveComponentsRoot()],
    },
  },
});
