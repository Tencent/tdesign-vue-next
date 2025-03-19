import { defineConfig } from 'vitest/config';
import { resolveConfig, basePlugin } from '../../../script/vite.base.config';
import { resolveComponentsRoot, resolveTdesignVueNextRoot } from '@tdesign/internal-utils';

// 单元测试相关配置
const testConfig = async () => {
  return {
    include:
      process.env.NODE_ENV === 'test-snap'
        ? [await resolveTdesignVueNextRoot('test/unit/snap/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')]
        : [await resolveComponentsRoot('**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')],
    globals: true,
    environment: 'jsdom',
    testTimeout: 5000,
    setupFiles: process.env.NODE_ENV === 'test-snap' ? './unit/test-setup.js' : '',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    coverage: {
      reporter: ['text', 'json', 'html'],
      allowExternal: true,
      include: [await resolveComponentsRoot()],
    },
  };
};

export default defineConfig(async () => ({
  resolve: resolveConfig,
  plugins: basePlugin,
  test: await testConfig(),
}));
