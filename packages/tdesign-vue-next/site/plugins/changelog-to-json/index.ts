import { writeFile } from 'fs/promises';
import type { ViteDevServer } from 'vite';

import generateChangelogJson from '@tdesign/common-docs/plugins/changelog-to-json';
import { joinTdesignVueNextRoot } from '@tdesign/internal-utils';

const changelogConfigs = [
  {
    input: 'CHANGELOG.md',
    output: 'changelog.json',
  },
  {
    input: 'CHANGELOG.en-US.md',
    output: 'changelog.en-US.json',
  },
];

export default function changelog2Json() {
  return {
    name: 'changelog-to-json',
    configureServer(server: ViteDevServer) {
      // 开发模式时拦截请求
      changelogConfigs.forEach(({ input, output }) => {
        server.middlewares.use(`/${output}`, async (_, res) => {
          const json = await generateChangelogJson(joinTdesignVueNextRoot(input), 'web');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(json));
        });
      });
    },
    async closeBundle(error?: Error) {
      // 构建失败时跳过
      if (error) return;
      // 生产构建时写入物理文件
      if (process.env.NODE_ENV !== 'production') return;
      await Promise.all(
        changelogConfigs.map(({ input, output }) =>
          generateChangelogJson(joinTdesignVueNextRoot(input), 'web').then((json) =>
            writeFile(joinTdesignVueNextRoot(output), JSON.stringify(json), 'utf-8'),
          ),
        ),
      );
    },
  };
}
