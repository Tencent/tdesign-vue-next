import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ChatAction from '@tdesign/pro-components-chat/chat-action/index';

describe('ChatAction', () => {
  describe(':props', () => {
    it(':actionBar', () => {
      const wrapper = mount(ChatAction, {
        props: {
          actionBar: ['copy', 'good'],
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':disabled', () => {
      const wrapper = mount(ChatAction, {
        props: {
          actionBar: ['copy'],
          disabled: true,
        },
      });
      expect(wrapper.find('button').attributes('disabled')).toBeDefined();
      expect(wrapper.element).toMatchSnapshot();
    });
    it(':comment', () => {
      const wrapper = mount(ChatAction, {
        props: {
          actionBar: ['good'],
          comment: 'good',
        },
      });
      expect(wrapper.find('.t-chat-button--active').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('Event passthrough', () => {
      const fn = vi.fn();
      const wrapper = mount(ChatAction, {
        props: {
          actionBar: ['copy'],
          onActions: fn,
        },
      });
      wrapper.find('button').trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });
});
