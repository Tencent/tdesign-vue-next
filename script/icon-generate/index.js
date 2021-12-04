const fs = require('fs');
const path = require('path');
const _template = require('lodash/template');
const glob = require('glob');
const utils = require('../utils');

const SRC_ICONS_DIR = path.resolve(__dirname, '../../node_modules/tdesign-icons-vue-next/lib/components');

/**
 * icon scripts
 * @example node index.js  // update all icons（单图标组件文件模板地址 icon/single.tsx）
 * @example node index.js clear // clear all icons
 * @example node index.js demo // update all icons demo
 */

function createFile(path, data = '') {
  fs.writeFile(path, data, (err) => {
    if (err) {
      utils.log(err, 'error');
    } else {
      utils.log(`${path} file has been created successfully！`, 'success');
    }
  });
}

(async function generateDemo() {
  const files = glob.sync(`${SRC_ICONS_DIR}/**/*.js`);

  const icons = files.map((file) => path.basename(file).replace('.js', ''));

  const data = [];
  icons.forEach((icon) => {
    data.push(`<div class="t-demo-icon">
      <icon name="${icon}"/>
      <div class="t-demo-icon-name">${icon}</div>
    </div>`);
  });

  const tplPath = path.resolve(__dirname, './demo.tpl');
  const tplData = fs.readFileSync(tplPath).toString();
  const compile = _template(tplData);
  const iconDemo = compile({
    icons: data.join('\n    '),
  });
  console.log(iconDemo, 'iconDemo');
  const output = path.resolve(__dirname, '../../examples/icon/demos/all.vue');
  createFile(output, iconDemo);
})();
