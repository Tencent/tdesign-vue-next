import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';
// @ts-ignore
import multiInput from 'rollup-plugin-multi-input';

export default defineConfig({
  input: ['./index.ts', './src/*.ts'],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      entryFileNames: 'cjs/[name].js',
      chunkFileNames: 'cjs/[name]-[hash].js',
    },
    {
      dir: 'dist',
      format: 'es',
      entryFileNames: 'es/[name].js',
      chunkFileNames: 'es/[name]-[hash].js',
    },
  ],
  plugins: [
    multiInput(),
    typescript({
      resolveJsonModule: true,
      allowSyntheticDefaultImports: true,
      outDir: 'dist/types',
      declarationDir: 'dist/types',
      rootDir: '.',
    }),
    nodeResolve(),
    json(),
    del({ targets: 'dist' }),
  ],
});
