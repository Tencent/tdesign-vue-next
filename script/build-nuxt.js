const path = require('path');
const fs = require('fs');
const _ = require('lodash');
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
  const dirs = fs.readdirSync(inputComponents, { withFileTypes: true });
  for (const dirent of dirs) {
    if (dirent.isDirectory()) {
      const index = path.resolve(inputComponents, dirent.name, 'index.mjs');
      if (!dirent.name.startsWith('_') && dirent.name !== 'nuxt' && fs.existsSync(index)) {
        let componentsName = _.camelCase(dirent.name);
        componentsName = componentsName.substring(0, 1).toUpperCase() + componentsName.substring(1);

        // eslint-disable-next-line global-require,import/no-dynamic-require,no-await-in-loop
        const components = await import(`../es/${dirent.name}/index.mjs`);

        const componentNames = Object.keys(components).filter(
          (value) => components[value].name && components[value].name.startsWith('T'),
        );
        const otherComponentNames = componentNames.filter(
          (value) =>
            !components.default || (componentsName.toLowerCase() !== value.toLowerCase() && value !== 'default'),
        );

        let importCss = '';
        let importJs = '';
        if (fs.existsSync(path.resolve(inputComponents, dirent.name, 'style/index.css'))) {
          // eslint-disable-next-line no-template-curly-in-string
          importCss = `\nimport '../../${dirent.name}/style/index.css';`;
        }
        const fileStr = `${banner}import '../../style/index.css';${importCss}`;

        // 单组件
        if (components.default) {
          importJs = `\nexport { default } from '../../${dirent.name}/index.mjs';`;
          const str = fileStr + importJs;

          fs.writeFileSync(path.resolve(outputNuxtComponentsDir, `${componentsName}.mjs`), str);
        }
        // 多组件
        if (otherComponentNames.length > 0) {
          for (const otherComponentName of otherComponentNames) {
            importJs = `\nexport { ${otherComponentName} as default } from '../../${dirent.name}/index.mjs';`;
            const str = fileStr + importJs;

            fs.writeFileSync(path.resolve(outputNuxtComponentsDir, `${otherComponentName}.mjs`), str);
          }
        }
      }
    }
  }
};

createNuxtPlugin();
createNuxtComponents();
