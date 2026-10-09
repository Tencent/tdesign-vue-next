/**
 * L3 - 组合类 API
 *
 * 覆盖 ChatList + ChatItem + ChatSender + ChatActionbar 拼装的聊天界面，
 *    验证「输入 -> 发送 -> 入列 -> 操作回调」的整链路数据流。
 */
/* eslint-disable vue/one-component-per-file */
import { describe, expect, it, vi } from 'vitest';
import { defineComponent, ref } from 'vue';
import ChatList from '../chat-list';
import ChatSender from '../chat-sender';
import ChatActionbar from '../chat-actionbar';
import ChatMessage from '../chat-message';
import { flush, mountChat, textContent } from '../test/helpers';

describe('Chat composition', () => {
  describe('ChatList + ChatSender + ChatActionbar 组合', () => {
    const createChatApp = (onAction = vi.fn()) =>
      defineComponent({
        setup() {
          const list = ref<any[]>([
            { id: '1', role: 'user', content: [textContent('你好')] },
            { id: '2', role: 'assistant', content: [textContent('你好，有什么可以帮你？')] },
          ]);
          const value = ref('');
          const handleSend = (text: string) => {
            list.value = [
              ...list.value,
              { id: `${list.value.length + 1}`, role: 'user', content: [textContent(text)] },
            ];
          };
          return () => (
            <div>
              <ChatList
                data={list.value}
                v-slots={{
                  actionbar: () => <ChatActionbar actionBar={['copy', 'good']} onActions={onAction} />,
                }}
              />
              <ChatSender
                modelValue={value.value}
                {...{ 'onUpdate:modelValue': (next: string) => (value.value = next) }}
                onSend={handleSend}
              />
            </div>
          );
        },
      });

    it('初始渲染全部消息', () => {
      const wrapper = mountChat(createChatApp());
      expect(wrapper.findAllComponents(ChatMessage)).toHaveLength(2);
    });

    it('输入框发送后新消息入列', async () => {
      const wrapper = mountChat(createChatApp());
      const textarea = wrapper.find('textarea');
      (textarea.element as HTMLTextAreaElement).value = '新消息';
      await textarea.trigger('input');
      await flush();
      await wrapper.find('.t-chat-sender__button__sendbtn button').trigger('click');
      await flush();
      expect(wrapper.findAllComponents(ChatMessage)).toHaveLength(3);
    });

    it('消息项挂载自定义操作栏并触发回调', async () => {
      const onAction = vi.fn();
      const wrapper = mountChat(createChatApp(onAction));
      const actionbars = wrapper.findAllComponents(ChatActionbar);
      expect(actionbars.length).toBeGreaterThan(0);
      await actionbars[0].find('button').trigger('click');
      expect(onAction).toHaveBeenCalled();
    });

    it('组合场景下公开 class 结构完整', () => {
      const wrapper = mountChat(createChatApp());
      expect(wrapper.find('.t-chat').exists()).toBe(true);
      expect(wrapper.find('.t-chat__list').exists()).toBe(true);
      expect(wrapper.find('.t-chat-sender').exists()).toBe(true);
      expect(wrapper.find('.t-chat__actions').exists()).toBe(true);
    });
  });
});
