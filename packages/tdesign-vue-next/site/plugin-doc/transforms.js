import path from 'path';
import fs from 'fs';

import mdToVue from './md-to-vue';

let demoImports = {};
let demoCodesImports = {};

export default {
  before({ source, file }) {
    const resourceDir = path.dirname(file);
    const reg = file.match(/([\w-]+)\.?([\w-]+)?\.md/);
    const fileName = reg && reg[0];
    const componentName = reg && reg[1];
    const localeName = reg && reg[2];
    demoImports = {};
    demoCodesImports = {};

    // 统一换成 common 公共文档内容
    if (fileName && source.includes(':: BASE_DOC ::')) {
      const localeDocPath = path.resolve(__dirname, `../../packages/common/docs/web/api/${fileName}`);
      const defaultDocPath = path.resolve(__dirname, `../../packages/common/docs/web/api/${componentName}.md`);
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
      const tsDemoPath = path.resolve(resourceDir, `./_example-ts/${demoFileName}.vue`);

      if (!fs.existsSync(defaultDemoPath)) {
        console.log('\x1B[36m%s\x1B[0m', `${componentName} 组件需要实现 _example/${demoFileName}.vue 示例!`);
        return '\n<h3>DEMO (🚧建设中）...</h3>';
      }

      if (!fs.existsSync(tsDemoPath)) {
        console.log('\x1B[36m%s\x1B[0m', `${componentName} 组件需要实现 _example-ts/${demoFileName}.vue 示例!`);
      }

      return `\n::: demo _example/${demoFileName} ${componentName}\n:::\n`;
    });
    source.replace(/:::\s*demo\s+([\\/.\w-]+)/g, (demoStr, relativeDemoPath) => {
      const tsDemoPath = `_example-ts/${relativeDemoPath.split('/')?.[1]}`;
      const demoPathOnlyLetters = relativeDemoPath.replace(/[^a-zA-Z\d]/g, '');
      const demoDefName = `Demo${demoPathOnlyLetters}`;

      const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;
      const demoTsCodeDefName = `Demo${demoPathOnlyLetters}TsCode`;

      demoImports[demoDefName] = `import ${demoDefName} from './${relativeDemoPath}.vue'`;
      demoCodesImports[demoCodeDefName] = `import ${demoCodeDefName} from './${relativeDemoPath}.vue?raw'`;
      if (fs.existsSync(path.resolve(resourceDir, `${tsDemoPath}.vue`)))
        demoCodesImports[demoTsCodeDefName] = `import ${demoTsCodeDefName} from './${tsDemoPath}.vue?raw'`;
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
