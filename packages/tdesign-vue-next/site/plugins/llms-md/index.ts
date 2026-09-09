import path from 'path';

import generateLlmsDocs from '../../../../common/docs/plugins/generate-llms';

/**
 * vite 插件：站点构建时，基于组件清单映射生成组件的 LLM Markdown 文档。
 * 核心逻辑为纯 JS 方法 generateLlmsDocs（来自 common 的 docs/plugins/generate-llms），
 * 此处仅负责 vite 构建钩子分发。
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
      // 产物输出目录：从 config.build.outDir 推导，避免硬编码 dist
      const outputDir = config.build.outDir || path.join(siteRoot, 'dist');

      await generateLlmsDocs({
        componentsRoot,
        outputDir,
        platform: 'web',
        // 组件文档为 <slug>.md（如 button.md），非小程序仓库的 README.md
        docFilename: '{slug}.md',
        siteTitle: 'TDesign Vue Next',
        siteDescription: 'TDesign Vue Next 组件库的 LLM 友好文档索引。',
      });
    },
  };
}
