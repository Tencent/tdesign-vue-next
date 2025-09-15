import { defineConfig } from 'rollup';
import json from '@rollup/plugin-json';
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
// @ts-ignore
import multiInput from 'rollup-plugin-multi-input';

export default defineConfig({
  input: ['./index.ts'],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      banner: '#!/usr/bin/env node',
    },
  ],
  external: [
    // Node.js 内置模块
    'fs',
    'path',
    'util',
    'events',
    'stream',
    'crypto',
    'os',
    'child_process',
    // 外部依赖，不打包进去
    'commander',
    'degit',
    'pacote',
  ],
  plugins: [
    multiInput(),
    typescript({
      resolveJsonModule: true,
      allowSyntheticDefaultImports: true,
    }),
    nodeResolve({
      preferBuiltins: true,
      exportConditions: ['node'],
    }),
    commonjs(),
    json(),
    del({ targets: 'dist' }),
  ],
});
