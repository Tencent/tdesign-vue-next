import { describe, expect, it } from 'vitest';
import Chatbot from '..';
import { chatText, flush, mountChat, textContent } from '../../test/helpers';

describe('Chatbot', () => {
  describe('instanceFunctions', () => {
    it('setMessages 替换、追加、前插及 clearMessages 改变消息内容', async () => {
      const wrapper = mountChat(Chatbot, { props: { defaultMessages: [] } });
      await flush();
      const api = wrapper.vm as any;
      const message = (id: string, text: string) => ({ id, role: 'user', content: [textContent(text)] });
      api.setMessages([message('1', '第一条消息')]);
      await flush();
      expect(chatText(wrapper.element)).toContain('第一条消息');
      api.setMessages([message('2', '追加消息')], 'append');
      await flush();
      expect(chatText(wrapper.element)).toContain('第一条消息');
      expect(chatText(wrapper.element)).toContain('追加消息');
      api.setMessages([message('3', '前插消息')], 'prepend');
      await flush();
      const text = chatText(wrapper.element);
      expect(text.indexOf('前插消息')).toBeGreaterThanOrEqual(0);
      expect(text.indexOf('前插消息')).toBeLessThan(text.indexOf('第一条消息'));
      expect(text.indexOf('第一条消息')).toBeLessThan(text.indexOf('追加消息'));
      api.setMessages([message('4', '替换后的消息')]);
      await flush();
      expect(chatText(wrapper.element)).toContain('替换后的消息');
      expect(chatText(wrapper.element)).not.toContain('第一条消息');
      api.clearMessages();
      await flush();
      expect(chatText(wrapper.element)).not.toContain('替换后的消息');
    });
  });
});
