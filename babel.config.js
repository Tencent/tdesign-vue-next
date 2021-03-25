module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 3 Chrome versions',
            'last 3 Firefox versions',
            'Safari >= 10',
            'Explorer >= 11',
            'Edge >= 12',
          ],
          esmodules: true,
        },
        modules: false,
      },
    ],
  ],
  plugins: ['@vue/babel-plugin-jsx'],
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
            modules: 'commonjs',
          },
        ],
      ],
      plugins: ['@vue/babel-plugin-jsx'],
    },
  },
};
