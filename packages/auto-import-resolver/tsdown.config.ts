import { defineConfig } from 'tsdown/config';

export default defineConfig({
  entry: 'src/index.ts',
  format: ['esm', 'cjs'],
  exports: true,
  dts: true,
});
