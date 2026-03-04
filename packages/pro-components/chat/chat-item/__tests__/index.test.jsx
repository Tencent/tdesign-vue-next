import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ChatItem from '@tdesign/pro-components-chat/chat-item/index';
import ChatLoading from '@tdesign/pro-components-chat/chat-loading/index';
import ChatReasoning from '@tdesign/pro-components-chat/chat-reasoning/index';
import { omiVueify } from 'omi-vueify';

describe('ChatItem', () => {
  const provideMock = {
    role: { value: 'user' },
  };

  describe(':props', () => {
    it(':role - string', () => {
      const wrapper = mount(ChatItem, {
        props: {
          role: 'user',
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':variant - string', () => {
      const wrapper = mount(ChatItem, {
        props: {
          variant: 'primary',
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':reasoningLoading - boolean', () => {
      const wrapper = mount(ChatItem, {
        props: {
          reasoningLoading: true,
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.findComponent(ChatLoading).exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('<slot>', () => {
    it('default slot', () => {
      const wrapper = mount(ChatItem, {
        slots: {
          default: '<div>custom content</div>',
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('avatar slot', () => {
      const wrapper = mount(ChatItem, {
        slots: {
          avatar: '<div>custom avatar</div>',
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('operation', async () => {
      const fn = vi.fn();
      const wrapper = mount(ChatItem, {
        props: {
          onOperation: fn,
        },
        global: {
          provide: provideMock,
        },
      });
      await wrapper.find('.t-chat__actions-margin button').trigger('click');
      expect(fn).toHaveBeenCalled();
    });
  });

  describe('functional', () => {
    it('renders reasoning component when reasoning prop is provided', () => {
      const wrapper = mount(ChatItem, {
        props: {
          reasoning: { expandIconPlacement: 'right' },
          role: 'assistant',
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.findComponent(ChatReasoning).exists()).toBe(true);
    });
  });
});
