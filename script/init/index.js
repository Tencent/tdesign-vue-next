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

function deleteComponent(toBeCreatedFiles) {
  Object.keys(toBeCreatedFiles).forEach((dir) => {
    const _d = path.resolve(cwdPath, dir);
    fs.readdir(_d, (err, files = []) => {
      if (err) {
        utils.log(err, 'error');
      }
      files.forEach((file) => {
        const _f = path.resolve(_d, file);
        if (!fs.statSync(_f).isDirectory()) {
          fs.unlinkSync(_f);
        }
        utils.log(`${_f} has been removed.`, 'success');
      });
      // fs.rmdirSync(_d);
    });
  });
}

function addComponent(toBeCreatedFiles, component) {
  // At first, we need to create directories for component.
  Object.keys(toBeCreatedFiles).forEach((dir) => {
    const _d = path.resolve(cwdPath, dir);
    fs.mkdir(
      _d,
      { recursive: true },
      (err) => {
        if (err) {
          utils.log(err, 'error');
          return;
        }
        console.log(`${_d} directory has been created successfully！`);
        // Then, we create files for component.
        const contents = toBeCreatedFiles[dir];
        contents.files.forEach((item) => {
          if (typeof item === 'object') {
            let data = '';
            if (item.template) {
              const tplPath = path.resolve(__dirname, `./tpl/${item.template}`);
              data = fs.readFileSync(tplPath).toString();
              const compiled = _.template(data);
              data = compiled({
                component,
                upperComponent: getFirstLetterUpper(component),
              });
            }
            const _f = path.resolve(_d, item.file);
            createFile(_f, data, contents.desc);
          } else {
            const _f = path.resolve(_d, item);
            createFile(_f, '', contents.desc);
          }
        });
      }
    );
  });
}

function init() {
  const [component, isDeleted] = process.argv.slice(2);
  const toBeCreatedFiles = config.getToBeCreatedFiles(component);
  if (isDeleted === 'del') {
    deleteComponent(toBeCreatedFiles);
  } else {
    addComponent(toBeCreatedFiles, component);
  }
}

init();
