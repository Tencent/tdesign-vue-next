import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineComponent, h, nextTick } from 'vue';

describe('Grid hooks', () => {
  describe('useRowSize', () => {
    const originalInnerWidth = window.innerWidth;

    beforeEach(() => {
      vi.stubGlobal('innerWidth', 1024);
      vi.resetModules();
    });

    afterEach(() => {
      vi.stubGlobal('innerWidth', originalInnerWidth);
      vi.restoreAllMocks();
    });

    it('initial size', async () => {
      const { useRowSize } = await import('@tdesign/components/grid/hooks');
      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return { size };
        },
        render() {
          return h('div', { class: `size-${this.size}` });
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('div').exists()).toBe(true);
    });

    it('md for width 1024', async () => {
      vi.stubGlobal('innerWidth', 1024);
      const { useRowSize } = await import('@tdesign/components/grid/hooks');
      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return { size };
        },
        render() {
          return h('div', { 'data-size': this.size });
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('div').attributes('data-size')).toBe('md');
    });

    it('xs for width 500', async () => {
      vi.stubGlobal('innerWidth', 500);
      const { useRowSize } = await import('@tdesign/components/grid/hooks');
      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return { size };
        },
        render() {
          return h('div', { 'data-size': this.size });
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('div').attributes('data-size')).toBe('xs');
    });

    it('lg for width 1280', async () => {
      vi.stubGlobal('innerWidth', 1280);
      const { useRowSize } = await import('@tdesign/components/grid/hooks');
      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return { size };
        },
        render() {
          return h('div', { 'data-size': this.size });
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('div').attributes('data-size')).toBe('lg');
    });

    it('xl for width 1600', async () => {
      vi.stubGlobal('innerWidth', 1600);
      const { useRowSize } = await import('@tdesign/components/grid/hooks');
      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return { size };
        },
        render() {
          return h('div', { 'data-size': this.size });
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('div').attributes('data-size')).toBe('xl');
    });

    it('xxl for width 1920', async () => {
      vi.stubGlobal('innerWidth', 1920);
      const { useRowSize } = await import('@tdesign/components/grid/hooks');
      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return { size };
        },
        render() {
          return h('div', { 'data-size': this.size });
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('div').attributes('data-size')).toBe('xxl');
    });

    it('sm for width 800', async () => {
      vi.stubGlobal('innerWidth', 800);
      const { useRowSize } = await import('@tdesign/components/grid/hooks');
      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return { size };
        },
        render() {
          return h('div', { 'data-size': this.size });
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('div').attributes('data-size')).toBe('sm');
    });

    it('resize event', async () => {
      vi.stubGlobal('innerWidth', 1024);
      const { useRowSize } = await import('@tdesign/components/grid/hooks');
      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return { size };
        },
        render() {
          return h('div', { 'data-size': this.size });
        },
      });

      const wrapper = mount(TestComponent);
      expect(wrapper.find('div').attributes('data-size')).toBe('md');

      // Simulate resize
      vi.stubGlobal('innerWidth', 1600);
      window.dispatchEvent(new Event('resize'));
      await nextTick();

      expect(wrapper.find('div').attributes('data-size')).toBe('xl');
    });

    it('server-side rendering', async () => {
      // Mock isServer to return true
      vi.doMock('@tdesign/shared-utils', () => ({
        isServer: true,
      }));

      vi.resetModules();
      const { useRowSize } = await import('@tdesign/components/grid/hooks');

      const TestComponent = defineComponent({
        setup() {
          const size = useRowSize();
          return { size };
        },
        render() {
          return h('div', { 'data-size': this.size });
        },
      });

      const wrapper = mount(TestComponent);
      // When isServer is true, innerWidth should be treated as 0, resulting in 'xs'
      expect(wrapper.find('div').attributes('data-size')).toBe('xs');

      // Trigger resize to cover updateSize function with isServer = true
      window.dispatchEvent(new Event('resize'));
      await nextTick();

      // Should still be 'xs' because isServer is true
      expect(wrapper.find('div').attributes('data-size')).toBe('xs');
    });
  });
});
