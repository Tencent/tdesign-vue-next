import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { CloseIcon, InfoCircleFilledIcon } from 'tdesign-icons-vue-next';
import { Message } from 'tdesign-vue-next';

const text = '这是一条Message信息';

describe('message', () => {
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
      const wrapper = mount(() => <Message duration={3000} onDurationEnd={onDurationEnd} />);
      expect(onDurationEnd).not.toBeCalled();
      vi.runAllTimers();
      expect(onDurationEnd).toHaveBeenCalledTimes(1);
    });
  });
});
