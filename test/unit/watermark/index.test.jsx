import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import Watermark from '@/src/watermark/index.ts';

// every component needs four parts: props/events/slots/functions.
describe('Watermark', () => {
  // test props api
  describe(':props', () => {
    HTMLCanvasElement.prototype.getContext = vi.fn();
    it('', () => {
      const wrapper = mount({
        render() {
          return <Watermark></Watermark>;
        },
      });
      expect(wrapper.exists()).toBe(true);
    });
  });
});
