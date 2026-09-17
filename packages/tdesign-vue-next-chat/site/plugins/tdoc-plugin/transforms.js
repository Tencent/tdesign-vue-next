import path from 'path';
import fs from 'fs';
import { joinPackagesRoot } from '@tdesign/internal-utils';

import mdToVue from './md-to-vue';

let demoImports = {};
let demoCodesImports = {};

const LOCAL_IMPORT_RE = /\b(?:import|export)\s+(?:type\s+)?(?:[^;]*?\s+from\s*)?['"](\.{1,2}\/[^'"]+)['"]/g;
const DYNAMIC_IMPORT_RE = /\bimport\s*\(\s*['"](\.{1,2}\/[^'"]+)['"]\s*\)/g;
const RESOLVE_EXTENSIONS = ['', '.vue', '.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less', '.scss', '.sass'];

const toPosixPath = (filePath) => filePath.split(path.sep).join('/');

const resolveLocalImport = (importer, request) => {
  const cleanRequest = request.replace(/[?#].*$/, '');
  const absolutePath = path.resolve(path.dirname(importer), cleanRequest);
  const candidates = [
    ...RESOLVE_EXTENSIONS.map((extension) => `${absolutePath}${extension}`),
    ...RESOLVE_EXTENSIONS.slice(1).map((extension) => path.join(absolutePath, `index${extension}`)),
  ];
  return candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
};

const collectLocalDependencies = (entryPath) => {
  const dependencies = [];
  const visited = new Set([entryPath]);

  const visit = (importer) => {
    const source = fs.readFileSync(importer, 'utf-8');
    const requests = new Set();
    for (const pattern of [LOCAL_IMPORT_RE, DYNAMIC_IMPORT_RE]) {
      pattern.lastIndex = 0;
      let match;
      while ((match = pattern.exec(source))) requests.add(match[1]);
    }

    requests.forEach((request) => {
      const dependency = resolveLocalImport(importer, request);
      if (!dependency || visited.has(dependency)) return;
      visited.add(dependency);
      dependencies.push(dependency);
      visit(dependency);
    });
  };

  visit(entryPath);
  return dependencies;
};

const createStackblitzFilesDefinition = (demoPath, resourceDir, definitionName) => {
  const dependencies = collectLocalDependencies(demoPath);
  const imports = [];
  const files = [];

  dependencies.forEach((dependency, index) => {
    const importName = `${definitionName}File${index}`;
    const importPath = toPosixPath(path.relative(resourceDir, dependency));
    const projectPath = path.posix.normalize(
      path.posix.join('src', toPosixPath(path.relative(path.dirname(demoPath), dependency))),
    );
    imports.push(`import ${importName} from './${importPath}?raw'`);
    files.push(`${JSON.stringify(projectPath)}: ${importName}`);
  });

  return `${imports.join(';\n')}${imports.length ? ';\n' : ''}const ${definitionName} = {${files.join(',')}}`;
};

export default {
  before({ source, file }) {
    const resourceDir = path.dirname(file);
    const reg = file.match(/([\w-]+)\.?([\w-]+)?\.md/);
    const fileName = reg && reg[0];
    const componentName = reg && reg[1];
    demoImports = {};
    demoCodesImports = {};

    // 统一换成 common 公共文档内容
    if (fileName && source.includes(':: BASE_DOC ::')) {
      const localeDocPath = joinPackagesRoot(`common/docs/web/api/${fileName}`);
      const defaultDocPath = joinPackagesRoot(`common/docs/web/api/${componentName}.md`);
      let baseDoc = '';
      if (fs.existsSync(localeDocPath)) {
        // 优先载入语言版本
        baseDoc = fs.readFileSync(localeDocPath, 'utf-8');
      } else if (fs.existsSync(defaultDocPath)) {
        // 回退中文默认版本
        baseDoc = fs.readFileSync(defaultDocPath, 'utf-8');
      } else {
        console.error(`未找到 ${defaultDocPath} 文件`);
      }
      source = source.replace(':: BASE_DOC ::', baseDoc);
    }

    // 替换成对应 demo 文件
    source = source.replace(/\{\{\s+(.+)\s+\}\}/g, (demoStr, demoFileName) => {
      const defaultDemoPath = path.resolve(resourceDir, `./_example/${demoFileName}.vue`);

      if (!fs.existsSync(defaultDemoPath)) {
        console.log('\x1B[36m%s\x1B[0m', `${componentName} 组件需要实现 _example/${demoFileName}.vue 示例!`);
        return '\n<h3>DEMO (🚧建设中）...</h3>';
      }

      return `\n::: demo _example/${demoFileName} ${componentName}\n:::\n`;
    });
    source.replace(/:::\s*demo\s+([\\/.\w-]+)/g, (demoStr, relativeDemoPath) => {
      // 需要携带 mock-data/sse-request 的示例
      const isMockDemoDisplay =
        ['_example/base', '_example/chat-drag', '_example/chat-drawer'].includes(relativeDemoPath) &&
        ['chat'].includes(componentName);

      // 需要携带 mock-data/sse-request-reasoning 的示例
      const isMockReasoningDemoDisplay =
        ['_example/reasoning', '_example/reasoning-drag', '_example/reasoning-drawer'].includes(relativeDemoPath) &&
        ['chat', 'chat-reasoning'].includes(componentName);
      const isComponentDemoDisplay =
        ['_example/agui', '_example/code'].includes(relativeDemoPath) && ['chatbot'].includes(componentName);

      const mockDemoPath = `_example/mock-data/sse-request.ts`;
      const mockReasoningDemoPath = `_example/mock-data/sse-request-reasoning.ts`;
      const toolCallDemoPath = `_example/components/toolcall.vue`;
      const loginDemoPath = `_example/components/login.vue`;

      const demoPathOnlyLetters = relativeDemoPath.replace(/[^a-zA-Z\d]/g, '');
      const demoDefName = `Demo${demoPathOnlyLetters}`;
      const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;
      const demoMockDataDefName = `Demo${demoPathOnlyLetters}TsCode`;
      const demoFilesDefName = `Demo${demoPathOnlyLetters}Files`;
      const demoAbsolutePath = path.resolve(resourceDir, `${relativeDemoPath}.vue`);

      demoImports[demoDefName] = `import ${demoDefName} from './${relativeDemoPath}.vue'`;
      demoCodesImports[demoCodeDefName] = `import ${demoCodeDefName} from './${relativeDemoPath}.vue?raw'`;
      demoCodesImports[demoFilesDefName] = createStackblitzFilesDefinition(
        demoAbsolutePath,
        resourceDir,
        demoFilesDefName,
      );
      if (isMockDemoDisplay)
        demoCodesImports[demoMockDataDefName] = `import ${demoMockDataDefName} from './${mockDemoPath}?raw'`;
      if (isMockReasoningDemoDisplay)
        demoCodesImports[demoMockDataDefName] = `import ${demoMockDataDefName} from './${mockReasoningDemoPath}?raw'`;
      if (isComponentDemoDisplay) {
        const componentDemoPath = relativeDemoPath === '_example/agui' ? toolCallDemoPath : loginDemoPath;
        demoCodesImports[demoMockDataDefName] = `import ${demoMockDataDefName} from './${componentDemoPath}?raw'`;
      }
    });

    return source;
  },
  render({ source, file, md }) {
    const demoDefsStr = Object.keys(demoImports)
      .map((key) => demoImports[key])
      .join(';\n');
    const demoCodesDefsStr = Object.keys(demoCodesImports)
      .map((key) => demoCodesImports[key])
      .join(';\n');
    const demoInstallStr = Object.keys(demoImports).join(',');
    const demoCodeInstallStr = Object.keys(demoCodesImports).join(',');

    const sfc = mdToVue({
      md,
      file,
      source,
      demoDefsStr,
      demoCodesDefsStr,
      demoInstallStr,
      demoCodeInstallStr,
    });

    return sfc;
  },
};
