const fs = require('fs');
const path = require('path');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');

const framework = 'VueNext(PC)';

const CONFIG = {
  'VueNext(PC)': {
    sourcePath: path.resolve(__dirname, '../../examples'),
    targetPath: path.resolve(__dirname, '../../test/unit'),
  },
};

function main() {
  fs.readdir(CONFIG[framework].sourcePath, (err, files) => {
    if (err) {
      console.log('Error', err);
    } else {
      // console.log('Result', files);
      files.forEach((componentFolder) => {
        const demoPath = `${CONFIG[framework].sourcePath}/${componentFolder}/demos`;
        fs.readdir(demoPath, (err1, demoFiles) => {
          if (err1) {
            console.log('Error', err1);
          } else {
            if (['icon', 'local-provider'].includes(componentFolder)) return;
            outputOneComponentTestFile(componentFolder, demoFiles);
          }
        });
      });
    }
  });
}

main();

const data = `/**
 * 该文件为由脚本 \`npm run test:demo\` 自动生成，如需修改，执行脚本命令即可。请勿手写直接修改，否则会被覆盖
 */

import { mount } from '@vue/test-utils';
{{ HERE IS DEMO LIST }}
`;

function getKeyFunction(component) {
  const newComponent = upperFirst(camelCase(component));
  return `
describe('${newComponent}', () => {
  Object.keys(mapper).forEach((demoName) => {
    it(\`${newComponent} \${demoName} demo works fine\`, () => {
      const wrapper = mount(mapper[demoName]);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});`;
}

function outputOneComponentTestFile(component, demoFiles) {
  const outputPath = `${CONFIG[framework].targetPath}/${component}`;
  const imports = [];
  const demos = ['\nconst mapper = {'];
  demoFiles.forEach((demo) => {
    const name = camelCase(demo);
    imports.push(`import ${name} from '@/examples/${component}/demos/${demo}';`);
    demos.push(`  ${name},`);
  });
  demos.push('};');
  const keyData = [imports.join('\n'), demos.join('\n'), getKeyFunction(component)].join('\n');
  const testFileData = data.replace('{{ HERE IS DEMO LIST }}', keyData);
  fs.mkdir(outputPath, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.writeFile(`${outputPath}/demo.test.js`, testFileData, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log(`test file: ${outputPath} has been created.`);
    });
  });
}
