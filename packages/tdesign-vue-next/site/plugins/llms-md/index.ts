import path from 'path';
import { promises, readFileSync } from 'fs';

import generateLlmsDocs from '../../../../common/docs/plugins/generate-llms';

/**
 * vite 插件：站点构建时，基于组件清单映射生成组件的 LLM Markdown 文档。
 * 核心逻辑为纯 JS 方法 generateLlmsDocs（来自 common 的 docs/plugins/generate-llms），
 * 此处仅负责 vite 构建钩子分发，并按 vue-next 仓库约定注入组件文档与 demo 源码读取器。
 */
export default function generateLlmsPlugin() {
  let config: any;
  return {
    name: 'generate-llms',
    configResolved(resolvedConfig: any) {
      config = resolvedConfig;
    },
    async closeBundle(error?: Error) {
      if (error) return;
      if (!config.env.PROD && config.env.MODE !== 'preview') return;

      // 基于 config.root 推导路径，避免依赖 __dirname 多层回溯
      const siteRoot = config.root;
      const componentsRoot = path.resolve(siteRoot, '../../components');
      // common 子仓扁平文档目录（组件文档为 <slug>.md，如 packages/common/docs/web/api/affix.md）
      const docsRoot = path.resolve(siteRoot, '../../common/docs/web/api');
      // 产物输出目录：从 config.build.outDir 推导，避免硬编码 dist
      const outputDir = config.build.outDir || path.join(siteRoot, 'dist');

      // 组件文档读取器：优先读 common 子仓扁平目录 <slug>.md，回退组件目录内 README.md / <slug>.md
      const readComponentDoc = async (componentDir: string, slug: string): Promise<string | null> => {
        const docPaths = [
          path.join(docsRoot, `${slug}.md`),
          path.join(componentDir, 'README.md'),
          path.join(componentDir, `${slug}.md`),
        ];
        const contents = await Promise.all(
          docPaths.map((docPath) => promises.readFile(docPath, 'utf-8').catch(() => null)),
        );
        return contents.find((content) => content !== null) ?? null;
      };

      // demo 源码读取器：读取 _example/<demoName>.vue，输出 Vue SFC 代码块
      const readDemoCode = (componentDir: string, demoName: string): string => {
        try {
          const content = readFileSync(path.join(componentDir, '_example', `${demoName}.vue`), 'utf-8');
          return content.trim() ? `\`\`\`vue\n${content}\n\`\`\`` : '';
        } catch {
          return '';
        }
      };

      await generateLlmsDocs({
        componentsRoot,
        outputDir,
        platform: 'web',
        readComponentDoc,
        readDemoCode,
        siteTitle: 'TDesign Vue Next',
        siteDescription: 'TDesign Vue Next 组件库的 LLM 友好文档索引。',
      });
    },
  };
}
