import { mount } from '@vue/test-utils';
import Slider from '@/src/slider/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Slider', () => {
  // test props api
  describe(':props', () => {
    it('', () => {
      const wrapper = mount({
        render() {
          return <Slider />;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
});
