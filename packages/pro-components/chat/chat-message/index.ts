import 'tdesign-web-components/lib/chat-message';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
import type { TdChatItemProps } from 'tdesign-web-components';

export const ChatMessage = omiVueify('t-chat-item', {
  methodNames: [],
}) as DefineComponent<TdChatItemProps>;
export default ChatMessage;
