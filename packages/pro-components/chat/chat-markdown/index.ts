import 'tdesign-web-components/lib/chat-message/content/markdown-content';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
import type { TdChatMarkdownContentProps } from 'tdesign-web-components/lib/chat-message/content/markdown-content';

// Markdown内容
export const ChatMarkdown = omiVueify('t-chat-md-content', {
  methodNames: [],
}) as DefineComponent<TdChatMarkdownContentProps>;
export default ChatMarkdown;
