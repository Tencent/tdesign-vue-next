import glob from 'glob';
import MockDate from 'mockdate';
// import { mount } from '@vue/test-utils';
import { renderToString } from '@vue/server-renderer';
import { createApp } from 'vue';
import TDesign from '@/src/index';

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

function ssrSnapshotTest() {
  const files = glob.sync('./examples/affix/demos/*.vue');
  describe('ssr snapshot test', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    files.forEach((file) => {
      if (file.indexOf('temp') > -1) {
        return;
      }
      it(`renders ${file} correctly`, async () => {
        const demo = require(`../.${file}`);
        const realDemoComp = demo.default ? demo.default : demo;
        // const wrapper = mount(realDemoComp);
        const app = createApp(realDemoComp);
        app.use(TDesign);
        const html = await renderToString(app);
        expect(html).toMatchSnapshot();
      }, 2000);
    });
  });
}

ssrSnapshotTest();
