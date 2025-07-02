import { mount } from '@vue/test-utils';
import ChatLoading from '@tdesign/pro-components-chat/chat-loading/index';
import { omiVueify } from 'omi-vueify';

describe('ChatLoading', () => {
  describe(':props', () => {
    it(':animation - moving', () => {
      const wrapper = mount(ChatLoading, {
        props: {
          animation: 'moving',
        },
      });
      expect(wrapper.find('.t-chat-loading__indicator--moving').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':animation - gradient', () => {
      const wrapper = mount(ChatLoading, {
        props: {
          animation: 'gradient',
        },
      });
      expect(wrapper.find('.t-chat-loading__indicator--gradient').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });

    it(':text', () => {
      const wrapper = mount(ChatLoading, {
        props: {
          text: 'Loading...',
        },
      });
      expect(wrapper.find('.t-chat-loading__text').text()).toBe('Loading...');
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
