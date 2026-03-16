import { defineConfig, searchForWorkspaceRoot } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tDocPlugin from './plugin-doc';
import {
  joinPosix,
  joinComponentsRoot,
  joinTdesignVueNextRoot,
  getProComponentsChatRoot,
} from '@tdesign/internal-utils';

const publicPathMap: Record<string, string> = {
  preview: '/',
  production: 'https://static.tdesign.tencent.com/chat/',
};

export default defineConfig(({ mode }) => {
  return {
    base: publicPathMap[mode],
    resolve: {
      alias: {
        '@': joinPosix(__dirname, './'),
        '@tdesign/vue-next': joinTdesignVueNextRoot(),
        '@tdesign/components': joinComponentsRoot(),
        '@tdesign-vue-next/chat': getProComponentsChatRoot(),
        // TODO: paopao 为什么还需要 alias，因为在 example 中的写法只能是 tdesign-vue-next，虽然有这个子应用，但没有 build 是没用的，同时即便是 prebuild 了，hmr 也是问题
        'tdesign-vue-next/es': joinComponentsRoot(),
        'tdesign-vue-next': joinComponentsRoot(),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 17001,
      open: '/',
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd())],
      },
    },
    plugins: [vue(), vueJsx(), tDocPlugin()],
    optimizeDeps: {
      include: ['prismjs', 'prismjs/components/prism-bash.js'],
      exclude: [
        '@tdesign/pro-components-chat',
        '@tdesign-vue-next/chat',
        '@tdesign/components',
        '@tdesign/common',
        'tdesign-vue-next',
        'tdesign-vue-next/es',
      ],
    },
  };
});
