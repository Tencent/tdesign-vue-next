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
  if (execArray && execArray.length > 0) {
    execArray.forEach((value, index1, array) => {
      const exportComponents = value.match(/export \{(.*)} from '(.*\.mjs)';/i);
      const componentNames = exportComponents[1].split(',').map((value0) => value0.trim());
      const componentMjs = exportComponents[2].replace('./', '');

      // 多组件
      for (const componentName of componentNames) {
        if (componentName.startsWith('default')) {
          const fileStr = `${banner}import '../../style/index.css';\nexport { default } from '../../${componentMjs}';`;
          fs.writeFileSync(
            path.resolve(outputNuxtComponentsDir, `${componentName.replace('default as ', '')}.mjs`),
            fileStr,
          );
        } else {
          const fileStr = `${banner}import '../../style/index.css';\nexport { ${componentName} as default } from '../../${componentMjs}';`;
          fs.writeFileSync(path.resolve(outputNuxtComponentsDir, `${componentName}.mjs`), fileStr);
        }
      }
    });
  }
};

createNuxtPlugin();
createNuxtComponents();
