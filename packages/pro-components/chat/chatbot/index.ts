import 'tdesign-web-components/lib/chatbot';
import type { DefineComponent } from 'vue';
import { omiVueify } from 'omi-vueify';
import type {
  TdChatbotApi,
  TdChatListProps,
  TdChatProps,
  TdChatSearchContentProps,
  TdChatSuggestionContentProps,
} from 'tdesign-web-components';
export const Bot = omiVueify('t-chatbot', {
  // TODO: 这里可以补充TdChatbotApi里需要暴露出来的方法（ref实例上的方法）
  methodNames: ['addPrompt'],
}) as DefineComponent<TdChatProps>;

export default Bot;
