module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    mocha: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  // 配置小程序内全局函数，避免报错
  globals: {
    require: true,
    Page: true,
    wx: true,
    App: true,
    getApp: true,
    getCurrentPages: true,
    Component: true,
    getRegExp: true,
    NodeJS: true,
  },
  settings: {
    'import/resolver': {
      node: {},
    },
    'import/extensions': [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
  },
  overrides: [
    {
      files: ['*.config.js', 'test/script/*'],
      rules: {
        'no-console': 0,
        // node 环境下支持 require
        '@typescript-eslint/no-require-imports': 'off',
        'import/no-dynamic-require': 0,
      },
    },
  ],
  rules: {
    'no-continue': 0,
    'max-len': ['error', { code: 160, tabWidth: 2 }],
    'no-unused-vars': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-underscore-dangle': 0,
    'no-constant-condition': [
      'error',
      {
        checkLoops: false,
      },
    ],
    'comma-dangle': 0,
    'no-shadow': 0,
    'object-curly-newline': 0,
  },
};
