import glob from 'glob';
import MockDate from 'mockdate';
import { config } from '@vue/test-utils';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

function runTest() {
  const files = glob.sync('./examples/**/demos/*.vue');
  const { createSSRApp } = config.global;

  describe('ssr snapshot test', () => {
    files.forEach((file) => {
      it(`ssr test ${file}`, async () => {
        const demo = await import(`../.${file}`);
        const realDemoComp = demo.default ? demo.default : demo;
        realDemoComp.name = `test-csr-${realDemoComp.name}`;
        const html = await createSSRApp(realDemoComp);
        expect(html).toMatchSnapshot();
      });
    });
  });
}

runTest();
