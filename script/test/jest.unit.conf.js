const baseConfig = require('./jest.base.conf.js');

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  // 打开测试覆盖率报告
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!**/node_modules/**',
  ],
  coverageReporters: ['html', 'text-summary'],
};
