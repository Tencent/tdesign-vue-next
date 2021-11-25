const baseConfig = require('./jest.base.conf.js');

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  testRegex: 'unit/.*\\.test\\.js$',
  // close coverage by default
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx,js,vue}', '!**/node_modules/**'],
  coverageReporters: ['html', 'text-summary'],
};
