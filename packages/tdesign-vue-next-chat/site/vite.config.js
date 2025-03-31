import { defineConfig, searchForWorkspaceRoot } from 'vite';
import tDocPlugin from './plugin-doc';
import { resolveConfig, basePlugin } from '../../../script/vite.base.config';

const publicPathMap = {
  preview: '/',
  intranet: '/chat/',
  production: 'https://static.tdesign.tencent.com/chat/',
};

export default ({ mode }) => {
  return defineConfig({
    base: publicPathMap[mode],
    resolve: resolveConfig,
    server: {
      host: '0.0.0.0',
      port: 17001,
      open: '/',
      https: false,
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd())],
      },
    },
    plugins: [...basePlugin, tDocPlugin()],
    optimizeDeps: {
      include: ['prismjs', 'prismjs/components/prism-bash.js'],
    },
  });
};
