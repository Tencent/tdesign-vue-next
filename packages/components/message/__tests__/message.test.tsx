// @ts-nocheck
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { CloseIcon, InfoCircleFilledIcon } from 'tdesign-icons-vue-next';
import { Message, MessagePlugin } from '@tdesign/components/message';
import { nextTick } from 'vue';

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

  describe('MessagePlugin', () => {
    beforeEach(() => {
      MessagePlugin.closeAll();
    });

    it('should create only one instance per placement', async () => {
      MessagePlugin.info('msg1', 0);
      MessagePlugin.info('msg2', 0);
      MessagePlugin.info('msg3', 0);

      await nextTick();

      const messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(3);

      const containers = document.querySelectorAll('.t-message__list');
      expect(containers.length).toBe(1);
    });

    it('should close all messages with closeAll()', async () => {
      MessagePlugin.info('msg1', 0);
      MessagePlugin.info('msg2', 0);

      await nextTick();

      expect(document.querySelectorAll('.t-message').length).toBe(2);

      MessagePlugin.closeAll();
      await nextTick();

      expect(document.querySelectorAll('.t-message').length).toBe(0);
    });
  });
});
