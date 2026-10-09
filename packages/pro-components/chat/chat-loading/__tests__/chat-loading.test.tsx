import { describe, expect, it } from 'vitest';
import ChatLoading from '..';
import { chatText, findInChat, flush, mountChat } from '../../test/helpers';

describe('ChatLoading', () => {
  describe('scenarios', () => {
    it('默认动画保持当前运行时 moving 行为', async () => {
      const wrapper = mountChat(ChatLoading);
      await flush();
      expect(findInChat(wrapper.element, '.t-chat-loading__moving').length).toBeGreaterThan(0);
    });
    it('文案渲染并响应更新', async () => {
      const wrapper = mountChat(ChatLoading, { props: { text: '正在生成回答' } });
      await flush();
      expect(chatText(wrapper.element)).toContain('正在生成回答');
      await wrapper.setProps({ text: '正在加载下一段' });
      await flush();
      expect(chatText(wrapper.element)).toContain('正在加载下一段');
      expect(chatText(wrapper.element)).not.toContain('正在生成回答');
    });
    it('切换 animation 时替换当前动画内容', async () => {
      const wrapper = mountChat(ChatLoading, { props: { animation: 'moving' } });
      await flush();
      expect(findInChat(wrapper.element, '.t-chat-loading__moving')).toHaveLength(1);
      expect(findInChat(wrapper.element, '.t-chat-loading__gradient')).toHaveLength(0);

      await wrapper.setProps({ animation: 'gradient' });
      await flush();
      expect(findInChat(wrapper.element, '.t-chat-loading__moving')).toHaveLength(0);
      expect(findInChat(wrapper.element, '.t-chat-loading__gradient')).toHaveLength(1);
    });
  });
});
