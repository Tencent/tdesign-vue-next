import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tDocPlugin from './plugin-doc';
import pwaConfig from './pwaConfig';
import { resolveConfig, basePlugin } from '../../../script/vite.base.config';

const publicPathMap = {
  preview: '/',
  intranet: '/vue-next/',
  production: 'https://static.tdesign.tencent.com/vue-next/',
};

export default ({ mode }) => {
  return defineConfig({
    base: publicPathMap[mode],
    resolve: resolveConfig,
    server: {
      host: '0.0.0.0',
      port: 17000,
      open: '/',
      https: false,
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd())],
      },
    },
    plugins: [...basePlugin, tDocPlugin(), VitePWA(pwaConfig)],
    optimizeDeps: {
      include: ['prismjs', 'prismjs/components/prism-bash.js'],
    },
  });
};
