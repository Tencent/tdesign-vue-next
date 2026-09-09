import { promises, readFileSync, existsSync } from 'fs';
import path from 'path';

import generateLlmsDocs, { createComponentDocParser } from '../../../../common/docs/plugins/generate-llms';

/**
 * 读取组件目录下的 demo 源码：_example/<demoName>.vue，回退 <demoName>/index.vue。
 * 输出 Vue SFC 代码块。
 */
function readVueDemo(componentDir: string, demoName: string): string {
  const candidates = [
    path.join(componentDir, '_example', `${demoName}.vue`),
    path.join(componentDir, '_example', demoName, 'index.vue'),
  ];
  for (const candidate of candidates) {
    try {
      const content = readFileSync(candidate, 'utf-8');
      if (content.trim()) return `\`\`\`vue\n${content.trim()}\n\`\`\``;
    } catch {
      // 继续尝试下一个候选路径
    }
  }
  return '';
}

/**
 * 判断是否为 demo 占位符：匹配 _example/<demoName>.vue 或 _example/<demoName>/index.vue。
 * 本仓库 demo 为扁平 .vue 文件（非目录），默认目录判断不命中，需自定义以正确替换 {{ demo }}。
 */
function isDemoSlot(componentDir: string, demoName: string): boolean {
  const candidates = [
    path.join(componentDir, '_example', `${demoName}.vue`),
    path.join(componentDir, '_example', demoName, 'index.vue'),
  ];
  return candidates.some((candidate) => existsSync(candidate));
}

/**
 * vite 插件：chat 站点构建时，基于 CHAT_COMPONENT_MAP 生成组件的 LLM Markdown 文档。
 * 核心逻辑为纯 JS 方法 generateLlmsDocs（来自 common 的 docs/plugins/generate-llms），
 * 此处仅负责 vite 构建钩子分发，并按 vue-chat 仓库约定注入组件文档与 demo 源码读取器。
 */
export default function generateChatLlmsPlugin() {
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
      const componentsRoot = path.resolve(siteRoot, '../../pro-components/chat');
      // common 子仓文档根目录（组件文档为 <slug>.md，如 packages/common/docs/web/api/chat-actionbar.md）
      const docsRoot = path.resolve(siteRoot, '../../common/docs');
      // 产物输出目录：从 config.build.outDir 推导，避免硬编码 dist
      const outputDir = config.build.outDir || path.join(siteRoot, 'dist');

      // 组件文档读取器：读取 common 子仓扁平目录 <slug>.md
      const readComponentDoc = async (_componentDir: string, slug: string): Promise<string | null> => {
        const docPath = path.join(docsRoot, 'web/api', `${slug}.md`);
        try {
          return await promises.readFile(docPath, 'utf-8');
        } catch {
          return null;
        }
      };

      // 通用文档解析管道：读取 frontmatter -> 替换 demo -> 清理正文
      const parseComponentDoc = createComponentDocParser({
        readComponentDoc,
        readDemoCode: readVueDemo,
        isDemoSlot,
        transformers: [],
      });

      await generateLlmsDocs({
        componentsRoot,
        outputDir,
        platform: 'chat',
        parseComponentDoc,
        siteTitle: 'TDesign Vue Chat',
        siteDescription: 'TDesign 聊天组件库的 LLM 友好文档索引。',
      });
    },
  };
}
