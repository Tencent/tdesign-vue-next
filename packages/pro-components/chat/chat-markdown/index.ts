import '@tdesign/web-components-chat/chat-message';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
import type { TdChatMarkdownContentProps } from '@tdesign/web-components-chat/chat-message';

// Markdown内容
export const ChatMarkdown = omiVueify('t-chat-md-content', {
  methodNames: [],
}) as unknown as DefineComponent<TdChatMarkdownContentProps>;
export default ChatMarkdown;
