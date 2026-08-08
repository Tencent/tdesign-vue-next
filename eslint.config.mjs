import { tdesign } from '@tdesign/eslint-config';

export default tdesign({
  preset: 'vue',
  tests: true,
  ignores: ['packages/common/**'],
});
