import fs from 'fs';
import { camelCase } from 'lodash-es';
import { parseFromString } from 'dom-parser';
import { joinTdesignVueNextRoot } from '@tdesign/internal-utils';

fs.readFile(joinTdesignVueNextRoot('test/coverage/index.html'), 'utf8', (err, html) => {
  if (err) {
    // eslint-disable-next-line
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
    const resultCoverage: Record<string, Record<string, string>> = {};

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

    const finalRes = `export default ${JSON.stringify(resultCoverage, null, 2)};\n`;
    fs.writeFileSync(joinTdesignVueNextRoot('my-site/configs/test-coverage.ts'), finalRes);

    // eslint-disable-next-line
    console.log('successful re-generate coverage');
  }
});
