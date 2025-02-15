import { resolveConfig, basePlugin } from '../../../script/vite.base.config';

// 单元测试相关配置
const testConfig = {
  include:
    process.env.NODE_ENV === 'test-snap'
      ? ['./packages/tdesign-vue-next/test/unit/snap/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
      : ['./packages/components/**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  globals: true,
  environment: 'jsdom',
  testTimeout: 5000,
  setupFiles: process.env.NODE_ENV === 'test-snap' ? './unit/test-setup.js' : '',
  transformMode: {
    web: [/\.[jt]sx$/],
  },
  coverage: {
    reporter: ['text', 'json', 'html'],
    reportsDirectory: 'packages/tdesign-vue-next/test/coverage',
  },
};

export default {
  // TODO 后续使用 @pnpm/find-workspace-dir 替换
  root: '../../../',
  resolve: resolveConfig,
  plugins: basePlugin,
  test: testConfig,
};
