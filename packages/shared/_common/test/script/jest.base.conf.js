const path = require('path');

module.exports = {
  verbose: true,
  rootDir: path.resolve(__dirname, '../../'),
  testURL: 'http://localhost/',
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/test/unit/coverage/'],
  transform: {
    '.*\\.js$': 'babel-jest',
    '.*\\.ts$': 'ts-jest',
  },
  testRegex: '.*\\.test\\.js$',
  testPathIgnorePatterns: ['/node_modules/', '.history'],
  globals: {
    'ts-jest': {
      // tsConfig: '<rootDir>/tsconfig.json',
      babelConfig: true,
    },
  },
  reporters: [
    'default',
    ['./node_modules/jest-html-reporter', {
      pageTitle: 'TDesign Test Report',
    }],
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
