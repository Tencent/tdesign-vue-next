const baseConfig = require('./jest.base.conf.js');

module.exports = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  testRegex: 'ssr/.*\\.test\\.js$',
};
