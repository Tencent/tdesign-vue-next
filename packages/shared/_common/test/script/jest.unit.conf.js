const baseConfig = require('./jest.base.conf');

const {
  JEST_REPORT
} = process.env;

const config = {
  ...baseConfig,
  testEnvironment: 'jsdom',
  testRegex: 'unit/.*\\.test\\.js$',
  // close coverage by default
  collectCoverage: true,
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'utils/**/*.{ts,tsx,js,jsx}',
    'js/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
  ],
};

if (JEST_REPORT === 'default') {
  delete config.coverageReporters;
} else if (JEST_REPORT === 'simple') {
  delete config.coverageDirectory;
  delete config.collectCoverageFrom;
} else if (JEST_REPORT === 'none') {
  config.collectCoverage = false;
  delete config.coverageDirectory;
  delete config.collectCoverageFrom;
} else {
  config.coverageReporters = ['html', 'text-summary'];
}

module.exports = config;
