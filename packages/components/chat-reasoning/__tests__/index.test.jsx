import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import ChatReasoning from '@tdesign/pro-components-chat/chat-reasoning/index';

describe('ChatReasoning', () => {
  const provideMock = {
    role: { value: 'user' },
  };

  describe(':props', () => {
    it(':collapsed - boolean', () => {
      const wrapper = mount(ChatReasoning, {
        props: {
          collapsed: true,
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':layout - string', () => {
      const wrapper = mount(ChatReasoning, {
        props: {
          layout: 'border',
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.find('.t-chat__detail-reasoning-border').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':expandIconPlacement - string', () => {
      const wrapper = mount(ChatReasoning, {
        props: {
          expandIconPlacement: 'right',
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@event', () => {
    it('onExpandChange', async () => {
      const fn = vi.fn();
      const wrapper = mount(ChatReasoning, {
        props: {
          collapsed: false,
          onExpandChange: fn,
        },
        global: {
          provide: provideMock,
        },
      });

      // Simulate clicking the expand icon
      await wrapper.find('.t-collapse-panel__header').trigger('click');
      expect(fn).toHaveBeenCalledWith(true);
    });
  });

  describe('<slot>', () => {
    it('default slot', () => {
      const wrapper = mount(ChatReasoning, {
        slots: {
          default: '<div>custom content</div>',
        },
        global: {
          provide: provideMock,
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
