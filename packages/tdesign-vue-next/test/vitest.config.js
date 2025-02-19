import { resolveConfig, basePlugin } from '../../../script/vite.base.config';
import { componentsRoot, resolvePackagesRoot } from '@tdesign/internal-utils';

// 单元测试相关配置
const testConfig = {
  include:
    process.env.NODE_ENV === 'test-snap'
      ? [resolvePackagesRoot('tdesign-vue-next/test/unit/snap/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')]
      : [resolvePackagesRoot('components/**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')],
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
    include: [componentsRoot],
  },
};

export default {
  resolve: resolveConfig,
  plugins: basePlugin,
  test: testConfig,
};
