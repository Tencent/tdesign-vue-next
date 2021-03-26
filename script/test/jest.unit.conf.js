const baseConfig = require('./jest.base.conf.js');
const [, , component] = process.argv.slice(2);
let seprateConfig;

if (component) {
  seprateConfig = {
    testMatch: [`**/unit/${component}/**/*.test.js`],
    collectCoverage: false,
  };
  delete baseConfig.testRegex;
} else {
  seprateConfig = {
    testRegex: 'unit/.*\\.test\\.js$',
    collectCoverage: true,
  };
}

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  ...seprateConfig,
  // close coverage by default
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,vue}',
    '!**/node_modules/**',
  ],
  coverageReporters: ['html', 'text-summary'],
};
