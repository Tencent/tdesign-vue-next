import { resolveConfig, basePlugin } from '../../../script/vite.base.config';
import path from 'path';

const resolve = (...args) => path.resolve(...args);
// TODO 后续使用 @pnpm/find-workspace-dir 替换
const workspaceDir = resolve(__dirname, '../../../');
const relativeWorkspacePath = (...args) => resolve(workspaceDir, ...args);

// 单元测试相关配置
const testConfig = {
  include:
    process.env.NODE_ENV === 'test-snap'
      ? [
          relativeWorkspacePath(
            'packages/tdesign-vue-next/test/unit/snap/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
          ),
        ]
      : [relativeWorkspacePath('packages/components/**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}')],
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
    include: [relativeWorkspacePath('packages/components')],
  },
};

export default {
  resolve: resolveConfig,
  plugins: basePlugin,
  test: testConfig,
};
