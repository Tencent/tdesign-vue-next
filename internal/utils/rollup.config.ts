import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
// @ts-ignore
import multiInput from 'rollup-plugin-multi-input';

export default defineConfig({
  input: ['./index.ts', './src/*.ts'],
  output: [
    {
      dir: 'dist/cjs',
      format: 'cjs',
    },
    {
      dir: 'dist/es',
      format: 'es',
    },
  ],
  plugins: [
    multiInput(),
    typescript({
      resolveJsonModule: true,
      allowSyntheticDefaultImports: true,
    }),
    nodeResolve({ preferBuiltins: true }),
    commonjs(),
    json(),
    del({ targets: 'dist' }),
  ],
});
