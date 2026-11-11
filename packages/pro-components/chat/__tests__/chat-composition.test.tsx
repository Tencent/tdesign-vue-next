import { describe, expect, it, vi } from 'vitest';
import { defineComponent, ref, shallowRef } from 'vue';
import ChatList from '../chat-list';
import ChatSender from '../chat-sender';
import ChatActionbar from '../chat-actionbar';
import type { TdChatItemMeta } from '../type';
import { chatText, findInChat, flush, mountChat, textContent } from '../test/helpers';

describe('Chat composition', () => {
  describe('scenarios', () => {
    describe('Sender to List to Actionbar', () => {
      it('renders the sent message and reports the action on the corresponding list item', async () => {
        const onAction = vi.fn();
        const Host = defineComponent({
          setup() {
            const data = shallowRef<Array<TdChatItemMeta & { id: string }>>([
              { id: 'reply', role: 'assistant', content: [textContent('initial answer')] },
            ]);
            const value = ref('');
            return () => (
              <div>
                <ChatList
                  data={data.value}
                  v-slots={{
                    actionbar: ({ item }: any) => (
                      <span data-message={item.id}>
                        <ChatActionbar
                          actionBar={['good']}
                          onActions={(action, context) => onAction(item.id, action, context)}
                        />
                      </span>
                    ),
                  }}
                />
                <ChatSender
                  modelValue={value.value}
                  {...{
                    'onUpdate:modelValue': (next: string) => {
                      value.value = next;
                    },
                  }}
                  onSend={(text) => {
                    data.value = [...data.value, { id: 'sent', role: 'user', content: [textContent(text)] }];
                  }}
                />
              </div>
            );
          },
        });
        const wrapper = mountChat(Host);
        await flush();
        expect(chatText(wrapper.element)).toContain('initial answer');
        expect(chatText(wrapper.element)).not.toContain('new question');
        await wrapper.find('textarea').setValue('new question');
        await flush();
        await wrapper.find('.t-chat-sender__button__sendbtn button').trigger('click');
        await flush();
        expect(chatText(wrapper.element)).toContain('new question');
        expect(chatText(wrapper.element)).toContain('initial answer');
        const action = findInChat(wrapper.element, '[data-message="reply"] button')[0];
        expect(action).toBeDefined();
        action.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
        expect(onAction).toHaveBeenCalledTimes(1);
        expect(onAction).toHaveBeenCalledWith('reply', 'good', expect.objectContaining({ e: expect.anything() }));
      });
    });
  });
});
