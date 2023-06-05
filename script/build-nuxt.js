const path = require('path');
const fs = require('fs');
const pkg = require('../package.json');

const name = 'tdesign';
const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

const inputComponents = path.resolve(__dirname, '../es/');
const outputNuxtDir = path.resolve(__dirname, '../es/nuxt');
const outputNuxtComponentsDir = path.resolve(__dirname, '../es/nuxt/components');

/** 创建nuxt.mjs文件 */
const createNuxtPlugin = () => {
  const fileStr = `${banner}import { defineNuxtModule } from '@nuxt/kit'
import { fileURLToPath } from 'node:url'

export default defineNuxtModule({
  hooks: {
    'components:dirs'(dirs) {
      // Add ./components dir to the list
      dirs.push({
        path: fileURLToPath(new URL('./components', import.meta.url)),
        prefix: 'T'
      })
    }
  }
})`;
  if (fs.existsSync(outputNuxtDir)) {
    fs.rmSync(outputNuxtDir, { recursive: true });
  }
  fs.mkdirSync(outputNuxtDir);

  fs.writeFileSync(path.resolve(outputNuxtDir, `index.mjs`), fileStr);
};

/** 创建组件文件 */
const createNuxtComponents = async () => {
  if (!fs.existsSync(outputNuxtComponentsDir)) {
    fs.mkdirSync(outputNuxtComponentsDir);
  }
  const index = fs.readFileSync(path.resolve(inputComponents, 'index.mjs'));
  const indexMjs = index.toString();
  const execArray = indexMjs.match(/export \{.*} from '.*\.mjs';/g);
  const cssImport = `${banner}import '../../style/index.css';`;

  if (execArray && execArray.length > 0) {
    execArray.forEach((value) => {
      const exportComponents = value.match(/export \{(.*)} from '\.\/(.*)\.mjs';/i);
      console.log(exportComponents[1]);
      const componentNames = exportComponents[1].split(',').map((value0) => value0.trim());
      const componentPath = exportComponents[2];

      // 多组件
      for (let componentName of componentNames) {
        componentName = componentName.replace('default as ', '');
        let exportDefault = '';
        if (componentName.startsWith('default')) {
          exportDefault = `export { default } from '../../${componentPath}';`;
        } else {
          exportDefault = `export { ${componentName} as default } from '../../${componentPath}';`;
        }
        fs.writeFileSync(path.resolve(outputNuxtComponentsDir, `${componentName}.d.ts`), exportDefault);
        fs.writeFileSync(
          path.resolve(outputNuxtComponentsDir, `${componentName}.mjs`),
          [cssImport, exportDefault].join('\n'),
        );
      }
    });
  }
};

createNuxtPlugin();
createNuxtComponents();
