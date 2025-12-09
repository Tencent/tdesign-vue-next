import { promises } from 'fs';
import type { ViteDevServer } from 'vite';

import generateChangelogJson from '@tdesign/common-docs/plugins/changelog-to-json';
import { joinTdesignVueNextRoot } from '@tdesign/internal-utils';

const outputPath = joinTdesignVueNextRoot('site/dist/changelog.json');
const changelogPath = joinTdesignVueNextRoot('CHANGELOG.md');

export default function changelog2Json() {
  return {
    name: 'changelog-to-json',
    configureServer(server: ViteDevServer) {
      // 开发模式时拦截请求
      server.middlewares.use('/changelog.json', async (_, res) => {
        const json = await generateChangelogJson(changelogPath, 'web');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json));
      });
    },
    async closeBundle(error?: Error) {
      if (error) return;
      // 生产构建时写入物理文件
      if (process.env.NODE_ENV === 'production') {
        const json = await generateChangelogJson(changelogPath, 'web');
        await promises.writeFile(outputPath, JSON.stringify(json));
      }
    },
  };
}
