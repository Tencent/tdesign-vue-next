import glob from 'glob';
import { mount, config } from '@vue/test-utils';
import MockDate from 'mockdate';
import { createRenderer } from 'vue-server-renderer';

const transitionStub = () => ({
  render: h => h('div'),
});
config.stubs.transition = transitionStub();

// 固定时间，当使用 new Date() 时，返回固定时间，防止“当前时间”的副作用影响，导致 snapshot 变更，mockdate 插件见 https://github.com/boblauer/MockDate
MockDate.set('2020-12-28');

function ssrSnapshotTest() {
  const files = glob.sync('./examples/*/demos/*.vue');
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
        const wrapper = mount(realDemoComp);
        const renderer = createRenderer();
        renderer.renderToString(wrapper.vm, (err, str) => {
          if (err) {
            throw err;
          }
          expect(str).toMatchSnapshot();
        });
      }, 2000);
    });
  });
}

ssrSnapshotTest();
