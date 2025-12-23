import generateChangelogJson from '../../../../../packages/common/docs/plugins/changelog-to-json';
import { promises } from 'fs';

import { joinTdesignVueNextChatRoot } from '@tdesign/internal-utils';

const outputPath = joinTdesignVueNextChatRoot('site/dist/changelog.json');
const changelogPath = joinTdesignVueNextChatRoot('CHANGELOG.md');

export default function changelog2Json() {
  return {
    name: 'changelog-to-json',
    configureServer(server) {
      // 开发模式时拦截请求
      server.middlewares.use('/changelog.json', async (_, res) => {
        const json = await generateChangelogJson(changelogPath, 'chat');
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json));
      });
    },
    async closeBundle() {
      // 生产构建时写入物理文件
      if (process.env.NODE_ENV === 'production') {
        const json = await generateChangelogJson(changelogPath, 'chat');
        await promises.writeFile(outputPath, JSON.stringify(json));
      }
    },
  };
}
