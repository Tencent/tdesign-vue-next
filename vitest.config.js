import { resolveConfig, basePlugin } from './script/vite.base.config';

// 单元测试相关配置
const testConfig = {
  include:
    process.env.NODE_ENV === 'test-snap'
      ? ['test/unit/snap/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
      : ['packages/components/**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  globals: true,
  environment: 'jsdom',
  testTimeout: 5000,
  setupFiles: process.env.NODE_ENV === 'test-snap' ? './test/unit/test-setup.js' : '',
  transformMode: {
    web: [/\.[jt]sx$/],
  },
  coverage: {
    reporter: ['text', 'json', 'html'],
  },
};

export default {
  resolve: resolveConfig,
  plugins: basePlugin,
  test: testConfig,
};
