import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  rollup: {
    inlineDependencies: ['@tdesign/common-js'],
  },
});
