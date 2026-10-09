// 少量真实调用示例：检查公开用法，不比较生成声明或底层实现类型。
import { ref, type Ref } from 'vue';
import {
  ChatList,
  ChatSender,
  useChat,
  type ChatInstanceFunctions,
  type ChatMessagesData,
  type ChatProps,
  type ChatSenderProps,
  type ChatServiceConfig,
} from '@tdesign-vue-next/chat';

const value = ref('问题');
const senderProps: ChatSenderProps = {
  value: value.value,
  loading: false,
  onSend: (text, { e }) => {
    value.value = text.trim();
    e.preventDefault();
  },
  onChange: (text) => {
    value.value = text;
  },
};

export const sender = (
  <ChatSender
    {...senderProps}
    modelValue={value.value}
    onUpdate:modelValue={(text: string) => {
      value.value = text;
    }}
  />
);

const listProps: ChatProps = { layout: 'both', reverse: false };
export const list = <ChatList {...listProps} />;
export const scroll = (instance: ChatInstanceFunctions) => instance.scrollToBottom?.({ behavior: 'smooth' });

const messages: ChatMessagesData[] = [{ id: 'user-1', role: 'user', content: [{ type: 'text', data: '问题' }] }];
const config: ChatServiceConfig = { endpoint: '/chat' };

// 由业务组件的 setup 调用；此文件仅编译，不执行网络请求或挂载。
export const setupChat = () => {
  const chat = useChat({ defaultMessages: messages, chatServiceConfig: config });
  const state: Ref<ChatMessagesData[]> = chat.messages;
  const status: string = chat.status.value;
  chat.chatEngine.value?.setMessages(messages, 'replace');
  chat.chatEngine.value?.clearMessages();
  return { state, status };
};

// 防止公开类型退化成 any 后，正确示例仍然假通过。
// @ts-expect-error Sender 的输入值必须是字符串
export const invalidSender = <ChatSender modelValue={123} />;
// @ts-expect-error 列表布局不接受任意字符串
export const invalidList = <ChatList layout="unsupported" />;
// @ts-expect-error 公开消息的 role 不接受任意字符串
export const invalidMessage: ChatMessagesData = { id: 'bad', role: 'unsupported', content: [] };
