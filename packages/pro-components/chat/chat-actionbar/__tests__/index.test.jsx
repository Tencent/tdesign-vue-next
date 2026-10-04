import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ChatAction from '../index';

/**
 * ChatActionbar 基础回归（组件级）
 * 历史用例依赖整棵 DOM 快照，迁移后会全量失败；这里只断言对外行为。
 */
describe('ChatAction', () => {
  describe(':props', () => {
    it(':actionBar', () => {
      const wrapper = mount(ChatAction, { props: { actionBar: ['copy', 'good'] } });
      expect(wrapper.find('.t-chat__actions').exists()).toBe(true);
      expect(wrapper.findAll('button')).toHaveLength(2);
    });

    it(':disabled', () => {
      const wrapper = mount(ChatAction, { props: { actionBar: ['copy'], disabled: true } });
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
    });

    it(':comment', () => {
      const wrapper = mount(ChatAction, { props: { actionBar: ['good'], comment: 'good' } });
      expect(wrapper.find('.t-chat-button--active').exists()).toBe(true);
    });
  });

  describe('@event', () => {
    it('Event passthrough', () => {
      const fn = vi.fn();
      const wrapper = mount(ChatAction, { props: { actionBar: ['copy'], onActions: fn } });
      wrapper.find('button').trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });
});
