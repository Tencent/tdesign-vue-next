const baseConfig = require('./jest.base.conf.js');

module.exports = {
  ...baseConfig,
  testEnvironment: 'node',
  testRegex: 'ssr/index\\.js$',
};
