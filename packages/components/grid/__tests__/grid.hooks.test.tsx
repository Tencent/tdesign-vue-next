import { describe, it, expect, vi, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';

describe('Grid hooks', () => {
  describe('useRowSize', () => {
    const originalInnerWidth = window.innerWidth;

    afterEach(() => {
      vi.stubGlobal('innerWidth', originalInnerWidth);
      vi.restoreAllMocks();
    });

    const createTestComponent = async (width: number) => {
      vi.stubGlobal('innerWidth', width);
      vi.resetModules();
      const { useRowSize } = await import('@tdesign/components/grid/hooks');

      // eslint-disable-next-line vue/one-component-per-file
      const TestComponent = defineComponent({
        setup(_, { expose }) {
          const size = useRowSize();
          expose({ size });
          return () => h('div', { 'data-size': size.value });
        },
      });

      return mount(TestComponent);
    };

    it('breakpoint mapping', async () => {
      const breakpoints: Array<[number, string]> = [
        [500, 'xs'],
        [800, 'sm'],
        [1024, 'md'],
        [1280, 'lg'],
        [1600, 'xl'],
        [1920, 'xxl'],
      ];

      for (const [width, expectedSize] of breakpoints) {
        const wrapper = await createTestComponent(width);
        expect(wrapper.find('div').attributes('data-size')).toBe(expectedSize);
        wrapper.unmount();
      }
    }, 30000);

    it('resize event', async () => {
      const wrapper = await createTestComponent(1024);
      expect(wrapper.find('div').attributes('data-size')).toBe('md');

      vi.stubGlobal('innerWidth', 1600);
      window.dispatchEvent(new Event('resize'));
      await nextTick();

      expect(wrapper.find('div').attributes('data-size')).toBe('xl');
      wrapper.unmount();
    }, 15000);

    it('server-side rendering', async () => {
      vi.doMock('@tdesign/shared-utils', () => ({
        isServer: true,
      }));
      vi.resetModules();

      const { useRowSize } = await import('@tdesign/components/grid/hooks');
      // eslint-disable-next-line vue/one-component-per-file
      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return () => h('div', { 'data-size': size.value });
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('div').attributes('data-size')).toBe('xs');

      window.dispatchEvent(new Event('resize'));
      await nextTick();
      expect(wrapper.find('div').attributes('data-size')).toBe('xs');
      wrapper.unmount();
    });
  });
});
