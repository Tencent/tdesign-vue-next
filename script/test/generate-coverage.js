import fs from 'fs';
import path from 'path';
import { camelCase } from 'lodash-es';
import { parseFromString } from 'dom-parser';

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

fs.readFile(resolveCwd('/packages/tdesign-vue-next/test/coverage/index.html'), 'utf8', (err, html) => {
  if (err) {
    console.log('please execute npm run test:unit-coverage first!', err);
    return;
  }
  if (!err) {
    const dom = parseFromString(html);
    const tds = dom.getElementsByTagName('td');
    const size = 10;
    const groups = Math.ceil(tds.length / size);

    const componentCoverage = [];
    for (let i = 0; i < groups; i++) {
      componentCoverage.push(tds.slice(i * size, (i + 1) * size));
    }
    const resultCoverage = {};

    componentCoverage.forEach((item) => {
      const dataVal = item[0].getAttribute('data-value');
      if (dataVal.split('/').length === 2) {
        const name = dataVal;
        const statements = `${item[2].getAttribute('data-value')}%`;
        const branches = `${item[4].getAttribute('data-value')}%`;
        const functions = `${item[6].getAttribute('data-value')}%`;
        const lines = `${item[8].getAttribute('data-value')}%`;
        const key = camelCase(name.split('/')[1]);

        resultCoverage[key] = {
          statements,
          branches,
          functions,
          lines,
        };
      }
    });

    const finalRes = `module.exports = ${JSON.stringify(resultCoverage, null, 2)};\n`;
    fs.writeFileSync(resolveCwd('/packages/tdesign-vue-next/site/test-coverage.js'), finalRes);
    console.log('successful re-generate coverage');
  }
});
