/* eslint-disable vue/one-component-per-file */
import { describe, expect, it } from 'vitest';
import { defineComponent } from 'vue';
import Chatbot from '..';
import { chatText, flush, mountChat, textContent } from '../../test/helpers';

/** Chatbot 对外承诺的实例方法（来自 TdChatbotApi） */
const CHATBOT_METHODS = [
  'addPrompt',
  'regenerate',
  'selectFile',
  'registerMergeStrategy',
  'setMessages',
  'clearMessages',
  'sendUserMessage',
  'sendAIMessage',
  'sendSystemMessage',
  'abortChat',
  'scrollList',
];

describe('Chatbot', () => {
  describe('instance methods', () => {
    it('对外实例方法契约完整', () => {
      const wrapper = mountChat(Chatbot);
      const instance = wrapper.vm as unknown as Record<string, any>;
      const missing = CHATBOT_METHODS.filter((method) => typeof instance[method] !== 'function');
      expect(missing, `缺少实例方法: ${missing.join(', ')}`).toEqual([]);
    });

    it('可作为子组件嵌套在业务组件中渲染', () => {
      const Host = defineComponent({
        setup() {
          return () => (
            <div class="host">
              <Chatbot />
            </div>
          );
        },
      });
      const wrapper = mountChat(Host);
      expect(wrapper.find('.host').exists()).toBe(true);
      expect(wrapper.findComponent(Chatbot).exists()).toBe(true);
    });
  });
  describe('scenarios', () => {
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
