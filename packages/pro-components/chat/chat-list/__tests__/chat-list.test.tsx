import { describe, expect, it, vi } from 'vitest';
import ChatList from '..';
import { chatItemMetaList, chatText, flush, mountChat } from '../../test/helpers';

describe('ChatList', () => {
  describe('props', () => {
    it('renders message content and metadata and responds to data updates', async () => {
      const wrapper = mountChat(ChatList, { props: { data: chatItemMetaList, clearHistory: false } });
      await flush();
      expect(chatText(wrapper.element)).toContain('你好，有什么可以帮你？');
      expect(chatText(wrapper.element)).toContain('TDesign Bot');
      expect(chatText(wrapper.element)).toContain('2024-01-01 10:00:01');
      await wrapper.setProps({ data: [] });
      await flush();
      expect(chatText(wrapper.element)).not.toContain('你好，有什么可以帮你？');
      expect(chatText(wrapper.element)).not.toContain('TDesign Bot');
    });

    it.each(['both', 'single'] as const)('applies the %s layout', (layout) => {
      const wrapper = mountChat(ChatList, { props: { layout } });
      expect(wrapper.classes().includes('t-chat--normal')).toBe(layout === 'both');
    });

    it('applies reverse layout', () => {
      const wrapper = mountChat(ChatList, { props: { reverse: true } });
      expect(wrapper.find('.t-chat__list--reverse').exists()).toBe(true);
    });

    it('hides the history action through clearHistory', () => {
      const wrapper = mountChat(ChatList, { props: { clearHistory: false } });
      expect(wrapper.find('.clear-btn').exists()).toBe(false);
    });
  });

  describe('events', () => {
    it('reports scrolling with the original DOM event', async () => {
      const onScroll = vi.fn();
      const wrapper = mountChat(ChatList, { props: { onScroll } });
      await wrapper.find('.t-chat__list').trigger('scroll');
      expect(onScroll).toHaveBeenCalledTimes(1);
      expect(onScroll).toHaveBeenCalledWith(expect.objectContaining({ e: expect.any(Event) }));
    });
  });

  describe('slots', () => {
    it('renders footer and default content', () => {
      const wrapper = mountChat(ChatList, {
        slots: { footer: '<span>list footer</span>', default: '<span>custom message</span>' },
      });
      expect(wrapper.text()).toContain('list footer');
      expect(wrapper.text()).toContain('custom message');
    });

    it('renders scoped content with each message and its index', async () => {
      const wrapper = mountChat(ChatList, {
        props: { data: chatItemMetaList },
        slots: {
          content: ({ item, index }: any) => (
            <span>
              {index}: {item.name}
            </span>
          ),
        },
      });
      await flush();
      expect(chatText(wrapper.element)).toContain('0: 张三');
      expect(chatText(wrapper.element)).toContain('1: TDesign Bot');
    });
  });

  describe('instanceFunctions', () => {
    it('scrollToBottom moves the list to its bottom', () => {
      const wrapper = mountChat(ChatList, { props: { autoScroll: false } });
      const list = wrapper.find('.t-chat__list').element;
      Object.defineProperties(list, { scrollHeight: { value: 500 }, clientHeight: { value: 100 } });
      (wrapper.vm as any).scrollToBottom({ behavior: 'auto' });
      expect(list.scrollTop).toBe(400);
    });
  });
});
