import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ChatReasoning from '../index';

/**
 * ChatReasoning 基础回归（组件级）
 * 去掉整棵 DOM 快照，改为断言布局 / 折叠行为 / 插槽等对外语义。
 */
describe('ChatReasoning', () => {
  describe(':props', () => {
    it(':layout', () => {
      const wrapper = mount(ChatReasoning, { props: { layout: 'border' } });
      expect(wrapper.find('.t-chat__detail-reasoning-border').exists()).toBe(true);
    });

    it(':collapsed', () => {
      const wrapper = mount(ChatReasoning, { props: { collapsed: true } });
      expect(wrapper.find('.t-chat__detail-reasoning').exists()).toBe(true);
    });
  });

  describe('@event', () => {
    it('onExpandChange', async () => {
      const fn = vi.fn();
      const wrapper = mount(ChatReasoning, { props: { collapsed: false, onExpandChange: fn } });
      await wrapper.find('.t-collapse-panel__header').trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('<slot>', () => {
    it('default slot', () => {
      const wrapper = mount(ChatReasoning, {
        slots: { default: '<div class="custom-content">custom content</div>' },
      });
      expect(wrapper.text()).toContain('custom content');
    });
  });
});
