// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { CloseIcon, InfoCircleFilledIcon } from 'tdesign-icons-vue-next';
import { Message } from '@tdesign/components/message';

const text = '这是一条Message信息';

describe('Message', () => {
  describe(':props', () => {
    it('', () => {
      const wrapper = mount(() => <Message content={text} />);
      const message = wrapper.find('.t-message');
      expect(message.exists()).toBeTruthy();
    });

    it(':content', () => {
      const wrapper = mount(() => <Message content={text} />);
      const message = wrapper.find('.t-message');
      expect(message.text()).toBe(text);
    });

    it(':closeBtn', () => {
      const wrapper = mount(() => <Message content={text} closeBtn />);
      const message = wrapper.find('.t-message');
      expect(message.findComponent(CloseIcon)).toBeTruthy();
    });

    it(':icon', () => {
      const wrapper = mount(() => <Message content={text} />);
      const message = wrapper.find('.t-message');
      expect(message.findComponent(InfoCircleFilledIcon)).toBeTruthy();
    });

    it(':theme', () => {
      const themeList = ['info', 'success', 'warning', 'error', 'question', 'loading'];
      themeList.forEach((theme) => {
        const wrapper = mount(() => <Message content={text} theme={theme} />);
        const message = wrapper.find('.t-message');
        expect(message.classes()).toContain(`t-is-${theme}`);
      });
    });

    it(':onCloseBtnClick', async () => {
      const fn = vi.fn();
      const wrapper = mount(() => <Message content={text} closeBtn onCloseBtnClick={fn} />);
      const closeBtn = wrapper.findComponent(CloseIcon);
      await closeBtn.trigger('click');
      expect(fn).toBeCalled();
    });

    it(':onClose', async () => {
      const onClose = vi.fn();
      const wrapper = mount(() => <Message content={text} closeBtn onClose={onClose} />);
      const closeBtn = wrapper.findComponent(CloseIcon);
      await closeBtn.trigger('click');
      expect(onClose).toBeCalled();
    });

    it(':onDurationEnd', () => {
      vi.useFakeTimers();
      const onDurationEnd = vi.fn();
      mount(() => <Message duration={3000} onDurationEnd={onDurationEnd} />);
      expect(onDurationEnd).not.toBeCalled();
      vi.runAllTimers();
      expect(onDurationEnd).toHaveBeenCalledTimes(1);
    });
  });

  describe('Message closeBtn prop', () => {
    it('renders default close icon when closeBtn is empty string', () => {
      const wrapper = mount(Message, {
        props: { closeBtn: '' },
      });
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);
    });

    it('renders default close icon when closeBtn is true', () => {
      const wrapper = mount(Message, {
        props: { closeBtn: true },
      });
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(true);
    });

    it('does not render close button when closeBtn is false', () => {
      const wrapper = mount(Message, {
        props: { closeBtn: false },
      });
      expect(wrapper.findComponent(CloseIcon).exists()).toBe(false);
    });

    it('renders custom closeBtn string', () => {
      const customText = '关闭';
      const wrapper = mount(Message, {
        props: { closeBtn: customText },
      });
      expect(wrapper.find('.t-message__close').text()).toBe(customText);
    });

    it('renders custom closeBtn function vnode', () => {
      const customVNode = () => <button class="custom-close">X</button>;
      const wrapper = mount(Message, {
        props: { closeBtn: customVNode },
      });
      expect(wrapper.find('button.custom-close').exists()).toBe(true);
    });

    it('renders default close icon if closeBtn not passed but slot exists', () => {
      const wrapper = mount(Message, {
        slots: {
          closeBtn: '<button class="slot-close">Close</button>',
        },
      });
      expect(wrapper.find('button.slot-close').exists()).toBe(true);
    });
  });
});
