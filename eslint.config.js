import antfu from '@antfu/eslint-config';

/**
 * 虽然很不想用他的，但不得不佩服，人写个 lint  都是专业的
 */
export default antfu({
  stylistic: {
    semi: true,
    // https://eslint.style/rules
    overrides: {
      'style/brace-style': ['error', '1tbs'],
      // 'style/nonblock-statement-body-position': ['off', 'below'],
    },
  },

  typescript: true,
  vue: true,

  formatters: {
    html: true,
  },
  ignores: [
    'tsconfig.json',
    'packages/shared/_common',
    'snapshot*',
    '_common',
    'script/test/cypress',
    'temp*',
    '_site',
    'esm',
    'es',
    'lib',
    'dist',
    'cjs',
    'usage',
  ],
  rules: {
    // https://eslint.org/docs/latest/rules/curly
    curly: ['error', 'all'],
  },
});
