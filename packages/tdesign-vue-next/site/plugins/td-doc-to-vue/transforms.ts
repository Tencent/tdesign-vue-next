import fs from 'fs';
import path from 'path';
import { joinPackagesRoot } from '@tdesign/internal-utils';

import mdToVue from './md-to-vue';

let demoImports: any = {};
let demoCodesImports: any = {};

export default {
  before({ source, file }: any) {
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
    source = source.replace(/\{\{\s+(.+)\s+\}\}/g, (demoStr: any, demoFileName: any) => {
      const defaultDemoPath = path.resolve(resourceDir, `./_example/${demoFileName}.vue`);

      if (!fs.existsSync(defaultDemoPath)) {
        // eslint-disable-next-line
        console.log('\x1B[36m%s\x1B[0m', `${componentName} 组件需要实现 _example/${demoFileName}.vue 示例!`);
        return '\n<h3>DEMO (🚧建设中）...</h3>';
      }

      return `\n::: demo _example/${demoFileName} ${componentName}\n:::\n`;
    });
    source.replace(/:::\s*demo\s+([\\/.\w-]+)/g, (demoStr: any, relativeDemoPath: any) => {
      const jsDemoPath = `_example-js/${relativeDemoPath.split('/')?.[1]}`;
      const demoPathOnlyLetters = relativeDemoPath.replace(/[^a-zA-Z\d]/g, '');
      const demoDefName = `Demo${demoPathOnlyLetters}`;

      const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;
      const demoTsCodeDefName = `Demo${demoPathOnlyLetters}TsCode`;

      demoImports[demoDefName] = `import ${demoDefName} from './${relativeDemoPath}.vue'`;
      // TypeScript tab: 原始 _example 中的 TS 源码
      demoCodesImports[demoTsCodeDefName] = `import ${demoTsCodeDefName} from './${relativeDemoPath}.vue?raw'`;
      // JavaScript tab: 编译后的 _example-js 中的 JS 版本
      if (fs.existsSync(path.resolve(resourceDir, `${jsDemoPath}.vue`)))
        demoCodesImports[demoCodeDefName] = `import ${demoCodeDefName} from './${jsDemoPath}.vue?raw'`;
      else demoCodesImports[demoCodeDefName] = `import ${demoCodeDefName} from './${relativeDemoPath}.vue?raw'`;
    });

    return source;
  },
  render({ source, file, md }: any) {
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
