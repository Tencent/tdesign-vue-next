import glob from 'glob';
import { mount } from '@vue/test-utils';
import { renderToString } from '@vue/server-test-utils';

// to fix some difference between mount and renderToString results
function wrapperConvert(wrapper) {
  let cwrapper = wrapper;
  if (typeof cwrapper === 'object') {
    return wrapper;
  }
  cwrapper = cwrapper.replace(/style=".*;"/g, (val) => {
    const ret = val.replace(/:/g, ': ');
    return ret;
  });
  return cwrapper;
}

function demoSnapshotTest(component) {
  const files = glob.sync(`./examples/${component}/demos/*.vue`);
  const renderMethod = (typeof window !== 'undefined') ? mount : renderToString;
  describe('ssr snapshot test', () => {
    files.forEach((file) => {
      it(`renders ${file} correctly`, async () => {
        const demo = require(`../.${file}`);
        const realDemoComp = demo.default ? demo.default : demo;
        const wrapper = await renderMethod(realDemoComp);

        const cwrapper = wrapperConvert(wrapper);

        expect(cwrapper).toMatchSnapshot();
      });
    });
  });
}

export default demoSnapshotTest;
