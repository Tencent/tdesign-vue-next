import path from 'path';
import fs from 'fs';

import mdToVue from './md-to-vue';

let demoImports = {};
let demoCodesImports = {};

export default {
  before({ source, file }) {
    const resouceDir = path.dirname(file);
    const reg = file.match(/examples\/(\w+-?\w+)\/\w+-?\w+\.md/);
    const name = reg && reg[1];
    demoImports = {};
    demoCodesImports = {};

    // 统一换成 iwiki 文档内容
    if (name && source.includes(':: BASE_DOC ::')) {
      const docPath = path.resolve(__dirname, `../../src/_common/docs/web/api/${name}.md`);
      if (fs.existsSync(docPath)) {
        const baseDoc = fs.readFileSync(docPath, 'utf-8');
        source = source.replace(':: BASE_DOC ::', baseDoc);
      } else {
        console.error(`未找到 ${docPath} 文件`);
      }
    }

    // 替换成对应 demo 文件
    source = source.replace(/\{\{\s+(.+)\s+\}\}/g, (demoStr, demoFileName) => {
      const demoPath = path.resolve(resouceDir, `../../examples/${name}/demos/${demoFileName}.vue`);
      if (!fs.existsSync(demoPath)) return '\n<h3>DEMO (🚧建设中）...</h3>';

      return `\n::: demo demos/${demoFileName} ${name}\n:::\n`;
    });

    if (source.includes(':: BASE_PROPS ::')) {
      let apiDoc = fs.readFileSync(path.resolve(resouceDir, './api.md'), 'utf-8');
      // fix table | render error
      apiDoc = apiDoc.replace(/`[^`]+`/g, (str) => str.replace(/\|/g, '\\|'));
      source = source.replace(':: BASE_PROPS ::', apiDoc);
    }

    source.replace(/:::\s*demo\s+([\\/.\w-]+)/g, (demoStr, relativeDemoPath) => {
      const demoPathOnlyLetters = relativeDemoPath.replace(/[^a-zA-Z\d]/g, '');
      const demoDefName = `Demo${demoPathOnlyLetters}`;
      const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;
      demoImports[demoDefName] = `import ${demoDefName} from './${relativeDemoPath}.vue';`;
      demoCodesImports[demoCodeDefName] = `import ${demoCodeDefName} from './${relativeDemoPath}.vue?raw';`;
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
