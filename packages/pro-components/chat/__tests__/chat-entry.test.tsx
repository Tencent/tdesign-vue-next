import { describe, expect, it } from 'vitest';
import { createApp } from 'vue';
import ChatPlugin, { Chat, ChatList, ChatAction, ChatActionbar } from '..';

describe('Chat public entry', () => {
  it('registers the exported components with app.use', () => {
    const app = createApp({ render: (): null => null });
    app.use(ChatPlugin);
    ['TChatList', 'TChatSender', 'TChatActionbar', 't-chatbot', 't-chat-message'].forEach((name) => {
      expect(app.component(name), name).toBeDefined();
    });
  });

  it('keeps the Chat and ChatAction compatibility aliases', () => {
    expect(Chat).toBe(ChatList);
    expect(ChatAction).toBe(ChatActionbar);
  });
});
