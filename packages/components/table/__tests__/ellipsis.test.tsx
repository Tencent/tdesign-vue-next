import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { expect, vi } from 'vitest';
import Ellipsis from '@tdesign/components/table/components/ellipsis';

describe('Ellipsis', () => {
  function mockOverflow(isOverflow: boolean) {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
    return vi.spyOn(HTMLElement.prototype, 'scrollWidth', 'get').mockReturnValue(isOverflow ? 200 : 50);
  }

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('props', () => {
    it(':content[string/TNode] and :default[string/TNode]', () => {
      mockOverflow(false);
      const content = mount(Ellipsis, { props: { content: 'content' } });
      expect(content.text()).toBe('content');
      expect(content.find('.t-table__ellipsis').attributes('style')).toContain('text-overflow: clip');

      const defaultContent = mount(Ellipsis, {
        props: { default: () => <span class="default-content">default</span> },
      });
      expect(defaultContent.find('.default-content').text()).toBe('default');
    });

    it(':classPrefix[string] / :overlayClassName[string] / :tooltipProps[object]', () => {
      mockOverflow(true);
      const wrapper = mount(Ellipsis, {
        props: {
          content: 'content',
          classPrefix: 'custom',
          overlayClassName: 'outer-overlay',
          tooltipProps: { overlayClassName: ['tooltip-overlay'], theme: 'light' },
          placement: 'top',
          attach: '#app',
          zIndex: 100,
        },
      });
      expect(wrapper.find('.custom-table__ellipsis').exists()).toBe(true);
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.props()).toMatchObject({ placement: 'top', attach: '#app', zIndex: 100, theme: 'light' });
      // tooltipProps is spread last by the current implementation and therefore replaces the merged classes.
      expect(tooltip.props('overlayClassName')).toEqual(['tooltip-overlay']);
    });

    it('rechecks overflow after content updates', async () => {
      vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(100);
      const scrollWidth = vi
        .spyOn(HTMLElement.prototype, 'scrollWidth', 'get')
        .mockReturnValueOnce(50)
        .mockReturnValue(200);
      const wrapper = mount(Ellipsis, { props: { content: 'before' } });
      await wrapper.setProps({ content: 'after' });
      expect(scrollWidth.mock.calls.length).toBeGreaterThanOrEqual(2);
      expect(wrapper.find('.t-table__ellipsis').attributes('style')).toContain('text-overflow: ellipsis');
    });
  });

  describe('events', () => {
    it('mouseenter lazily enables tooltip content and visible=false clears it', async () => {
      vi.useFakeTimers();
      mockOverflow(true);
      const tooltipContent = vi.fn(() => <span>tooltip</span>);
      const wrapper = mount(Ellipsis, { props: { content: 'cell', tooltipContent } });
      const tooltip = wrapper.findComponent({ name: 'TTooltip' });
      expect(tooltip.props('content')).toBe('');

      await wrapper.find('.t-table__ellipsis').trigger('mouseenter');
      vi.advanceTimersByTime(80);
      await nextTick();
      expect(tooltip.props('content')).toBe(tooltipContent);

      tooltip.props('onVisibleChange')(false);
      await nextTick();
      expect(tooltip.props('content')).toBe('');
    });

    it('mouseleave uses the debounced no-op branch and content falls back to the cell node', async () => {
      vi.useFakeTimers();
      mockOverflow(true);
      const wrapper = mount(Ellipsis, { props: { content: 'cell' } });
      const trigger = wrapper.find('.t-table__ellipsis');
      await trigger.trigger('mouseenter');
      vi.advanceTimersByTime(80);
      await nextTick();
      expect(typeof wrapper.findComponent({ name: 'TTooltip' }).props('content')).toBe('function');

      await trigger.trigger('mouseleave');
      vi.advanceTimersByTime(80);
      expect(wrapper.text()).toBe('cell');
    });
  });
});
