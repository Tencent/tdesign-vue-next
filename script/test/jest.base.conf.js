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
    'vue',
    'json',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^vue$': '<rootDir>/node_modules/vue/dist/vue.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/test/unit/coverage/'],
  transform: {
    '.*\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  testRegex: '.*\\.test\\.js$',
  setupFiles: ['<rootDir>/script/test/setup'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
      babelConfig: true,
    },
  },
  snapshotSerializers: ['jest-serializer-vue'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
