import 'tdesign-web-components/lib/chat-message';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
import type { TdChatMessageProps } from 'tdesign-web-components';

export const ChatMessage = omiVueify('t-chat-item', {
  methodNames: [],
}) as DefineComponent<TdChatMessageProps>;
export default ChatMessage;
