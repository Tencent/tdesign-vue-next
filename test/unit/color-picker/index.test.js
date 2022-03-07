import { mount } from '@vue/test-utils';
import ColorPicker from '@/src/color-picker/index.ts';

// every component needs four parts: props/events/slots/functions.
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
