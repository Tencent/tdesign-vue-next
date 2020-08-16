import glob from 'glob';
import { mount } from '@vue/test-utils';
import { renderToString } from '@vue/server-test-utils';

// convert hex to rgb
const hexToRgb = (hex) => {
  const rgb = [];
  let tempHex = hex.substr(1);
  // convert shorthand color to standard color
  if (tempHex.length === 3) {
    tempHex = tempHex.replace(/(.)/g, '$1$1');
  }
  tempHex.replace(/../g, (color) => {
    rgb.push(parseInt(color, 0x10));
  });
  return `rgb(${rgb.join(', ')});`;
};

// to fix some difference between mount and renderToString results
function wrapperConvert(wrapper) {
  let cwrapper = wrapper;
  if (typeof cwrapper === 'object') {
    return wrapper;
  }
  // style format fix
  cwrapper = cwrapper.replace(/style="(.*?;)"/g, (val) => {
    let ret = val.replace(/:/g, ': ');
    ret = ret.replace(/ 0;/g, ' 0px;');
    ret = ret.replace(/;/g, '; ');
    ret = ret.replace(/; "/g, ';"');
    ret = ret.replace(/#.*;/g, val => hexToRgb(val));
    return ret;
  });
  // href format fix
  cwrapper = cwrapper.replace(/xlink: href/g, 'xlink:href');
  // http format fix
  cwrapper = cwrapper.replace(/http: /g, 'http:');
  // value="" format fix
  cwrapper = cwrapper.replace(/ value=""/g, '');
  // checked format fix
  cwrapper = cwrapper.replace(/ checked="checked"/g, '');
  // &quot; format fix
  cwrapper = cwrapper.replace(/&quot;/g, '"');
  // disabled format fix
  cwrapper = cwrapper.replace(/disabled="disabled"/g, 'disabled=""');
  return cwrapper;
}

function demoSnapshotTest() {
  const files = glob.sync('./examples/*/demos/*.vue');
  const renderMethod = (typeof window !== 'undefined') ? mount : renderToString;
  describe('ssr snapshot test', () => {
    beforeAll(() => {
      jest.useFakeTimers();
    });
    files.forEach((file) => {
      it(`renders ${file} correctly`, async () => {
        const demo = require(`../.${file}`);
        const realDemoComp = demo.default ? demo.default : demo;
        const wrapper = await renderMethod(realDemoComp);
        const cwrapper = wrapperConvert(wrapper);
        expect(cwrapper).toMatchSnapshot();
      }, 2000);
    });
  });
}

demoSnapshotTest();
