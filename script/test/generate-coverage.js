const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');

const DomParser = require('dom-parser');

const parser = new DomParser();

function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

fs.readFile(resolveCwd('test/unit/coverage/index.html'), 'utf8', (err, html) => {
  if (err) {
    console.log('please execute npm run test:unit-coverage first!', err);
    return;
  }
  if (!err) {
    const dom = parser.parseFromString(html);
    const tds = dom.getElementsByTagName('td');

    const size = 10;
    const groups = Math.ceil(tds.length / size);
    const componentCoverage = [];
    for (let i = 0; i < groups; i++) {
      componentCoverage.push(tds.slice(i * size, (i + 1) * size));
    }

    const resultCoverage = {};
    componentCoverage.forEach((item, index) => {
      if (item[0].getAttribute('data-value').indexOf('/') === -1) {
        const name = item[0].getAttribute('data-value');
        const statements = `${item[2].getAttribute('data-value')}%`;
        const branches = `${item[4].getAttribute('data-value')}%`;
        const functions = `${item[6].getAttribute('data-value')}%`;
        const lines = `${item[8].getAttribute('data-value')}%`;

        const key = camelCase(name);
        resultCoverage[key] = {
          statements,
          branches,
          functions,
          lines,
        };
      }
    });

    const finalRes = `module.exports = ${JSON.stringify(resultCoverage)}`;
    fs.writeFileSync(resolveCwd('site/test-coverage.js'), finalRes);
    console.log('successful re-generate coverage');
  }
});
