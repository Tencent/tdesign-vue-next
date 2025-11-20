// import _ChatLoading from './chat-loading';
// export default _ChatLoading;
import { TdChatLoadingProps } from 'tdesign-web-components';
import 'tdesign-web-components/lib/chat-loading';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
// 附件
export const ChatLoading = omiVueify('t-chat-loading', {
  methodNames: [],
}) as DefineComponent<TdChatLoadingProps>;
export default ChatLoading;
