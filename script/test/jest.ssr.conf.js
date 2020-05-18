const baseConfig = require('./jest.base.conf.js');

module.exports = {
  ...baseConfig,
  testRegex: 'index\\.test\\.js$',
  // The test environment that will be used for testing
  testEnvironment: 'node',
};
