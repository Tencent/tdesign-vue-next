import { mount } from '@vue/test-utils';
import Rate from '@/src/rate/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Rate', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Rate></Rate>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
});
