import { joinTdesignVueNextRoot } from '@tdesign/internal-utils';
import type { ViteDevServer } from 'vite';

// 复用核心生成脚本（脚本内部以 import.meta 定位，贴合 ESM 运行）
// @ts-ignore
import {
  generateComponentMarkdown,
  generateEnglishMarkdown,
  generateLlmsMd,
  getComponentMeta,
  listComponents,
  buildIndexText,
} from '../../../../../script/generate-llms-md';

function getLlmsDir() {
  return joinTdesignVueNextRoot('site/dist/llms');
}

/**
 * llms-md 插件：
 *  - dev：拦截 /llms/* 请求，实时返回生成的 Markdown / 索引
 *  - build：closeBundle 阶段把全部 llms 文档写入 site/dist/llms
 */
export default function llmsMd() {
  return {
    name: 'llms-md',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/llms', async (req, res) => {
        try {
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          const urlPath = (req.url || '').split('?')[0];
          const fileName = urlPath.replace(/^\/+/, '');

          if (fileName === 'llms.txt') {
            res.end(buildIndexText(listComponents()));
            return;
          }

          const name = fileName.replace(/\.en-US\.md$/, '').replace(/\.md$/, '');
          const isEn = fileName.endsWith('.en-US.md');
          const meta = getComponentMeta(name);
          if (!meta) {
            res.statusCode = 404;
            res.end(`# ${name} not found`);
            return;
          }
          const md = isEn ? generateEnglishMarkdown(meta) : generateComponentMarkdown(meta);
          res.end(md);
        } catch (err) {
          res.statusCode = 500;
          res.end(`# Error\n${(err as Error).message}`);
        }
      });
    },
    async closeBundle(error?: Error) {
      // 构建失败时跳过
      if (error) return;
      // 生产构建时写入物理文件
      if (process.env.NODE_ENV !== 'production') return;

      // 内部会自动创建输出目录并写盘
      generateLlmsMd({ outputDir: getLlmsDir() });
    },
  };
}
