import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import createTDesignPlugin from './new-site/plugin-tdoc';
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue-next/' : './',
  root: './new-site',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@TDesign': path.resolve(__dirname, 'src'),
      '@tencent/tdesign-vue-next/lib': path.resolve(__dirname, 'src'),
      '@common': path.resolve(__dirname, 'common'),
      '@TdTypes': path.resolve(__dirname, 'types'),
    },
  },
  server: {
    host: '127.0.0.1',
    port: 17000,
    open: '/',
    https: false,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('td-')
        }
      }
    }),
    vueJsx(),
    ...createTDesignPlugin(),
  ]
})
