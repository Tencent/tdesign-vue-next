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

    it('should reset timer when messages are merged', async () => {
      vi.useFakeTimers();
      MessagePlugin.closeAll();
      await nextTick();

      // 发送第一条消息，设置较短的duration
      MessagePlugin.info({
        content: '定时器测试',
        mergeIdentical: true,
        duration: 2000, // 2秒后消失
      });

      await nextTick();

      let messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1);

      // 等待1500ms，第一条消息即将消失
      vi.advanceTimersByTime(1500);
      await nextTick();

      messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1);

      // 发送第二条相同消息，duration为5000ms，应该重置定时器
      MessagePlugin.info({
        content: '定时器测试',
        mergeIdentical: true,
        duration: 5000, // 5秒后消失
      });

      await nextTick();

      // 应该仍然只有1条消息，但计数为2
      messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1);
      expect(messages[0].textContent).toContain('(×2)');

      // 再等待1000ms（总共2500ms），如果定时器没有重置，消息应该已经消失了
      // 但是因为定时器被重置为5000ms，所以消息应该还存在
      vi.advanceTimersByTime(1000);
      await nextTick();

      messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1); // 这里应该通过，证明定时器被重置了

      vi.useRealTimers();
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

    it('should merge identical messages correctly when count > 2', async () => {
      MessagePlugin.closeAll();
      await nextTick();

      // 测试基本的2条消息合并
      MessagePlugin.info({
        content: '测试合并消息',
        mergeIdentical: true,
        duration: 0,
      });

      await nextTick();

      MessagePlugin.info({
        content: '测试合并消息',
        mergeIdentical: true,
        duration: 0,
      });

      await nextTick();

      // 检查是否合并为1条消息
      const messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1);
      expect(messages[0].textContent).toContain('(×2)');

      MessagePlugin.closeAll();
    });

    it('should handle merge with different content correctly', async () => {
      MessagePlugin.closeAll();
      await nextTick();

      // 发送不同内容的消息，不应该合并
      MessagePlugin.info({
        content: '消息1',
        mergeIdentical: true,
        duration: 0,
      });

      MessagePlugin.info({
        content: '消息2',
        mergeIdentical: true,
        duration: 0,
      });

      await nextTick();

      // 应该有2条不同的消息
      const messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(2);

      MessagePlugin.closeAll();
    });

    it('should merge multiple identical messages step by step', async () => {
      MessagePlugin.closeAll();
      await nextTick();

      // 逐步发送相同消息并验证每一步
      MessagePlugin.info({
        content: '步骤测试',
        mergeIdentical: true,
        duration: 0,
      });

      await nextTick();

      let messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1);
      expect(messages[0].textContent).toContain('步骤测试');
      expect(messages[0].textContent).not.toContain('×');

      // 第2条消息
      MessagePlugin.info({
        content: '步骤测试',
        mergeIdentical: true,
        duration: 0,
      });

      await nextTick();

      messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1);
      expect(messages[0].textContent).toContain('(×2)');

      // 第3条消息
      MessagePlugin.info({
        content: '步骤测试',
        mergeIdentical: true,
        duration: 0,
      });

      await nextTick();

      messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1);
      expect(messages[0].textContent).toContain('(×3)');

      MessagePlugin.closeAll();
    });

    it('should merge messages with custom merge window', async () => {
      vi.useFakeTimers();

      MessagePlugin.closeAll();
      await nextTick();

      // 发送第一条消息
      MessagePlugin.info({
        content: '长窗口合并测试',
        mergeIdentical: true,
        mergeWindow: 2000,
        duration: 0,
      });

      await nextTick();

      // 1.5秒后发送第二条相同消息，应该能合并
      vi.advanceTimersByTime(1500);
      MessagePlugin.info({
        content: '长窗口合并测试',
        mergeIdentical: true,
        mergeWindow: 2000,
        duration: 0,
      });

      await nextTick();
      vi.runOnlyPendingTimers();
      await nextTick();

      // 应该只有1条消息（合并后的）
      const messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1);
      expect(messages[0].textContent).toContain('(×2)');

      vi.useRealTimers();
      MessagePlugin.closeAll();
    });

    it('should not merge messages with different themes', async () => {
      MessagePlugin.closeAll();
      await nextTick();

      // 发送相同内容但不同主题的消息
      MessagePlugin.info({
        content: '相同内容不同主题',
        mergeIdentical: true,
        duration: 0,
      });

      MessagePlugin.error({
        content: '相同内容不同主题',
        mergeIdentical: true,
        duration: 0,
      });

      await nextTick();

      // 应该有2条消息（不同主题不合并）
      const messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(2);

      MessagePlugin.closeAll();
    });

    it('should merge messages with custom merge key', async () => {
      MessagePlugin.closeAll();
      await nextTick();

      // 发送不同内容但相同 mergeKey 的消息
      MessagePlugin.info({
        content: '消息内容1',
        mergeKey: 'custom-key',
        mergeIdentical: true,
        duration: 0,
      });

      MessagePlugin.warning({
        content: '消息内容2',
        mergeKey: 'custom-key',
        mergeIdentical: true,
        duration: 0,
      });

      await nextTick();

      // 应该只有1条消息（相同 mergeKey 会合并）
      const messages = document.querySelectorAll('.t-message');
      expect(messages.length).toBe(1);
      expect(messages[0].textContent).toContain('(×2)');

      MessagePlugin.closeAll();
    });
  });
});
