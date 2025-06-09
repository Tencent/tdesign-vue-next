import 'tdesign-web-components/lib/chat-message/content/thinking-content';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
import type { TdChatThinkContentProps } from 'tdesign-web-components/lib/chat-message/content/thinking-content';

// 思考过程
export const ChatThinking = omiVueify('t-chat-thinking-content', {
  methodNames: [],
}) as DefineComponent<TdChatThinkContentProps>;
export default ChatThinking;
