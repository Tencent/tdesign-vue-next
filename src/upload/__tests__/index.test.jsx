import { mount } from '@vue/test-utils';
import Upload from '@/src/upload/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Upload', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Upload></Upload>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
});
