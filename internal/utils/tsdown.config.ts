import { defineConfig } from 'tsdown/config';

export default defineConfig({
  entry: ['src/*.ts'],
  format: ['cjs', 'esm'],
});
