import {
  chatItemMetaList,
  chatText,
  expectEmitsContract,
  expectPropsContract,
  flush,
  mountChat,
} from '../../test/helpers';

/**
 * L2 - ChatList 基础 API / 事件 / 插槽 / 实例方法
 *
 * 断言只针对「公开行为」：
 * - 传入 data 后每条消息都通过 ChatMessage 渲染（与底层是 webc 还是 Vue 无关）；
 * - 公开 class（t-chat / t-chat__list / ...）保持稳定；
 * - 事件与实例方法的对外行为保持一致。
 */
import { describe, expect, it, vi } from 'vitest';
import { Popconfirm } from 'tdesign-vue-next';
import ChatList from '..';
import ChatMessage from '../../chat-message';

describe('ChatList', () => {
  describe('props', () => {
    it('保留公开 props 契约', () => expectPropsContract('ChatList', ChatList));

    it(':data 渲染每条消息', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList } });
      expect(wrapper.findAllComponents(ChatMessage)).toHaveLength(chatItemMetaList.length);
    });

    it(':data 在没有插槽时显示消息正文和元信息', async () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList } });
      await flush();
      const content = chatText(wrapper.element);
      expect(content).toContain('你好，有什么可以帮你？');
      expect(content).toContain('TDesign Bot');
      expect(content).toContain('2024-01-01 10:00:01');
    });

    it(':data 为空时不渲染消息', () => {
      const wrapper = mountChat(ChatList, { props: { data: [] } });
      expect(wrapper.findAllComponents(ChatMessage)).toHaveLength(0);
      expect(wrapper.find('.t-chat__list').exists()).toBe(true);
    });

    it(':layout=both 输出两侧对齐样式，user/assistant 分别左右分布', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, layout: 'both' } });
      expect(wrapper.find('.t-chat--normal').exists()).toBe(true);
      const messages = wrapper.findAllComponents(ChatMessage);
      expect(messages[0].props('placement')).toBe('right'); // user
      expect(messages[1].props('placement')).toBe('left'); // assistant
    });

    it(':layout=single 统一左对齐', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, layout: 'single' } });
      expect(wrapper.find('.t-chat--normal').exists()).toBe(false);
      wrapper.findAllComponents(ChatMessage).forEach((message) => {
        expect(message.props('placement')).toBe('left');
      });
    });

    it(':reverse 输出倒序样式', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, reverse: true } });
      expect(wrapper.find('.t-chat__list--reverse').exists()).toBe(true);
    });

    it(':clearHistory=false 不渲染清空历史入口', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, clearHistory: false } });
      expect(wrapper.find('.clear-btn').exists()).toBe(false);
    });

    it(':clearHistory 默认渲染清空历史入口', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList } });
      expect(wrapper.find('.clear-btn').exists()).toBe(true);
    });

    it(':textLoading 让最后一条消息进入 pending', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, textLoading: true } });
      const messages = wrapper.findAllComponents(ChatMessage);
      expect(messages[messages.length - 1].props('status')).toBe('pending');
    });

    it(':animation 透传给消息单元', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, animation: 'gradient' } });
      wrapper.findAllComponents(ChatMessage).forEach((message) => {
        expect(message.props('animation')).toBe('gradient');
      });
    });
  });

  describe('events', () => {
    it('保留公开 emits 契约', () => expectEmitsContract('ChatList', ChatList));

    it('滚动触发 scroll 事件', async () => {
      const onScroll = vi.fn();
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, onScroll } });
      await wrapper.find('.t-chat__list').trigger('scroll');
      expect(onScroll).toHaveBeenCalled();
      expect(onScroll.mock.calls[0][0]).toHaveProperty('e');
    });

    it('清空历史确认后触发 clear 事件', async () => {
      const onClear = vi.fn();
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, onClear } });
      const popconfirm = wrapper.findComponent(Popconfirm);
      expect(popconfirm.exists()).toBe(true);
      popconfirm.vm.$emit('confirm', { e: new MouseEvent('click') });
      await flush();
      expect(onClear).toHaveBeenCalled();
      expect(onClear.mock.calls[0][0]).toHaveProperty('e');
    });
  });

  describe('slots', () => {
    it('footer 插槽渲染在列表下方', () => {
      const wrapper = mountChat(ChatList, {
        props: { data: chatItemMetaList },
        slots: { footer: '<div class="custom-footer">footer content</div>' },
      });
      expect(wrapper.find('.t-chat__footer .custom-footer').exists()).toBe(true);
    });

    it('content / name / avatar / datetime / header 插槽逐条透传给消息单元', () => {
      const slotNames = ['content', 'name', 'avatar', 'datetime', 'header'];
      const wrapper = mountChat(ChatList, {
        props: { data: chatItemMetaList },
        slots: slotNames.reduce<Record<string, string>>((acc, name) => {
          acc[name] = `<div class="slot-${name}">${name}</div>`;
          return acc;
        }, {}),
      });
      const messages = wrapper.findAllComponents(ChatMessage);
      expect(messages).toHaveLength(chatItemMetaList.length);
      messages.forEach((message) => {
        slotNames.forEach((name) => {
          expect(message.vm.$slots, `插槽 ${name} 未透传`).toHaveProperty(name);
        });
      });
    });

    it('default 插槽在无 data 时生效', () => {
      const wrapper = mountChat(ChatList, {
        slots: { default: '<div class="slot-default">default item</div>' },
      });
      expect(wrapper.find('.slot-default').exists()).toBe(true);
    });
  });

  describe('instance methods', () => {
    it('暴露 scrollToBottom 实例方法', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList } });
      const exposed = wrapper.vm as unknown as Record<string, any>;
      expect(typeof exposed.scrollToBottom).toBe('function');
      expect(() => exposed.scrollToBottom({ behavior: 'auto' })).not.toThrow();
    });

    it('showScrollButton=false 时不渲染回到底部按钮', () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, showScrollButton: false } });
      expect(wrapper.find('.t-chat__to-bottom').exists()).toBe(false);
    });
  });
});
