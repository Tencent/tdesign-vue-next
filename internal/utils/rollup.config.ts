import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete';

export default defineConfig({
  input: './index.ts',
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
    typescript({
      // TODO: 等 tsconfig.json 完善后这里加上
      // declaration: true,
    }),
    nodeResolve(),
    del({ targets: 'dist' }),
  ],
});
