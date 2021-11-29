/**
 *
 * npm run init <component-name>
 *
 * This script helps you to start coding by creating some necessary files.
 * Before you run this script, you'd better save your code.
 *
 * @example npm run init table
 *   /tdesign/tdesign-web-vue/test/unit/table/demo.test.js will be created.
 *   /tdesign/tdesign-web-vue/test/e2e/table/table.spec.js will be created.
 *   /tdesign/tdesign-web-vue/test/unit/table/index.test.js will be created.
 *   /tdesign/tdesign-web-vue/examples/table/demos/base.vue will be created.
 *   /tdesign/tdesign-web-vue/src/table/index.ts will be created.
 *   /tdesign/tdesign-web-vue/examples/table/table.md will be created.
 *   /tdesign/tdesign-web-vue/src/table/table.tsx will be created.
 *
 * @example npm run init table del
 *   /tdesign/tdesign-web-vue/examples/table/demos/base.vue will be removed.
 *   /tdesign/tdesign-web-vue/examples/table/demos will be removed.
 *   /tdesign/tdesign-web-vue/examples/table/table.md will be removed.
 *   /tdesign/tdesign-web-vue/test/unit/table/demo.test.js will be removed.
 *   /tdesign/tdesign-web-vue/test/unit/table/index.test.js will be removed.
 *   /tdesign/tdesign-web-vue/src/table/index.ts will be removed.
 *   /tdesign/tdesign-web-vue/src/table/table.tsx will be removed.
 *   /tdesign/tdesign-web-vue/test/e2e/table/table.spec.js will be removed.
 */

const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const utils = require('../utils');
const config = require('./config');

const cwdPath = process.cwd();

function createFile(path, data = '', desc) {
  fs.writeFile(path, data, (err) => {
    if (err) {
      utils.log(err, 'error');
    } else {
      utils.log(`> ${desc}\n${path} file has been created successfully！`, 'success');
    }
  });
}

function getFirstLetterUpper(a) {
  return a[0].toUpperCase() + a.slice(1);
}

function getSnapshotFiles(component) {
  return {
    [`test/unit/${component}/__snapshots__/`]: {
      desc: 'snapshot test',
      files: ['index.test.js.snap', 'demo.test.js.snap'],
    },
  };
}

function deleteComponent(toBeCreatedFiles, component) {
  const snapShotFiles = getSnapshotFiles(component);
  const files = Object.assign(toBeCreatedFiles, snapShotFiles);
  Object.keys(files).forEach((dir) => {
    const item = files[dir];
    if (item.deleteFiles && item.deleteFiles.length) {
      item.deleteFiles.forEach((f) => {
        fs.existsSync(f) && fs.unlinkSync(f);
      });
    } else {
      utils.deleteFolderRecursive(dir);
    }
  });
  utils.log('All radio files have been removed.', 'success');
}

function outputFileWithTemplate(item, component, desc, _d) {
  const tplPath = path.resolve(__dirname, `./tpl/${item.template}`);
  let data = fs.readFileSync(tplPath).toString();
  const compiled = _.template(data);
  data = compiled({
    component,
    upperComponent: getFirstLetterUpper(component),
  });
  const _f = path.resolve(_d, item.file);
  createFile(_f, data, desc);
}

function addComponent(toBeCreatedFiles, component) {
  // At first, we need to create directories for components.
  Object.keys(toBeCreatedFiles).forEach((dir) => {
    const _d = path.resolve(cwdPath, dir);
    fs.mkdir(_d, { recursive: true }, (err) => {
      if (err) {
        utils.log(err, 'error');
        return;
      }
      console.log(`${_d} directory has been created successfully！`);
      // Then, we create files for components.
      const contents = toBeCreatedFiles[dir];
      contents.files.forEach((item) => {
        if (typeof item === 'object') {
          if (item.template) {
            outputFileWithTemplate(item, component, contents.desc, _d);
          }
        } else {
          const _f = path.resolve(_d, item);
          createFile(_f, '', contents.desc);
        }
      });
    });
  });
}

function getImportStr(upper, component) {
  return `import ${upper} from './${component}';`;
}

function deleteComponentFromIndex(component, indexPath) {
  const upper = getFirstLetterUpper(component);
  const importStr = `${getImportStr(upper, component)}\n`;
  let data = fs.readFileSync(indexPath).toString();
  data = data.replace(new RegExp(importStr), () => '').replace(new RegExp(`  ${upper},\n`), '');
  fs.writeFile(indexPath, data, (err) => {
    if (err) {
      utils.log(err, 'error');
    } else {
      utils.log(`${component} has been removed from /src/index.ts`, 'success');
    }
  });
}

function insertComponentToIndex(component, indexPath) {
  const upper = getFirstLetterUpper(component);
  // last import line pattern
  const importPattern = /import.*?;(?=\n\n)/;
  // components pattern
  const cmpPattern = /(?<=const components = {\n)[.|\s|\S]*?(?=};\n)/g;
  const importPath = getImportStr(upper, component);
  const desc = '> insert component into index.ts';
  let data = fs.readFileSync(indexPath).toString();
  if (data.match(new RegExp(importPath))) {
    utils.log(`there is already ${component} in /src/index.ts`, 'notice');
    return;
  }
  // insert component at last import and component lines.
  data = data.replace(importPattern, (a) => `${a}\n${importPath}`).replace(cmpPattern, (a) => `${a}  ${upper},\n`);
  fs.writeFile(indexPath, data, (err) => {
    if (err) {
      utils.log(err, 'error');
    } else {
      utils.log(`${desc}\n${component} has been inserted into /src/index.ts`, 'success');
    }
  });
}

function init() {
  const [component, isDeleted] = process.argv.slice(2);
  const indexPath = path.resolve(cwdPath, 'src/index.ts');
  const toBeCreatedFiles = config.getToBeCreatedFiles(component);
  if (isDeleted === 'del') {
    deleteComponent(toBeCreatedFiles, component);
    deleteComponentFromIndex(component, indexPath);
  } else {
    addComponent(toBeCreatedFiles, component);
    insertComponentToIndex(component, indexPath);
  }
}

init();
