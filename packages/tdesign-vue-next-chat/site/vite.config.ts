import { defineConfig, searchForWorkspaceRoot } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tDocPlugin from './plugin-doc';
import { posixNormalizePathJoin, joinComponentsRoot, joinTdesignVueNextRoot } from '@tdesign/internal-utils';

const publicPathMap: Record<string, string> = {
  preview: '/',
  intranet: '/chat/',
  production: 'https://static.tdesign.tencent.com/chat/',
};

export default defineConfig(({ mode }) => {
  return {
    base: publicPathMap[mode],
    resolve: {
      alias: {
        '@': posixNormalizePathJoin(__dirname, './'),
        '@tdesign/vue-next': joinTdesignVueNextRoot(),
        '@tdesign/components': joinComponentsRoot(),
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
    },
  };
});
