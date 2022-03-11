import { mount } from '@vue/test-utils';
import { ColorPickerPanel, ColorPicker } from '@/src/color-picker/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('ColorPickerPanel', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <ColorPickerPanel></ColorPickerPanel>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
});

describe('ColorPicker', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <ColorPicker></ColorPicker>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
});
