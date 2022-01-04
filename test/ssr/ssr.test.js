import glob from 'glob';
import { config } from '@vue/test-utils';

function ssrSnapshotTest() {
  const files = glob.sync('./examples/**/demos/*.vue');
  describe('ssr snapshot test', () => {
    beforeAll(() => {
      jest.useFakeTimers().setSystemTime(new Date('2021-12-31').getTime());
    });
    files.forEach((file) => {
      if (file.indexOf('temp') > -1) {
        return;
      }
      it(`renders ${file} correctly`, async () => {
        const demo = require(`../.${file}`);
        const realDemoComp = demo.default ? demo.default : demo;
        const { createSSRApp } = config.global;
        const html = await createSSRApp(realDemoComp);
        expect(html).toMatchSnapshot();
      }, 2000);
    });
  });
}

ssrSnapshotTest();
