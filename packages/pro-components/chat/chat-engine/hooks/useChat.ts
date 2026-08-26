import { onMounted, onUnmounted, ref, watch, type Ref } from 'vue';
import {
  ChatEngine,
  type ChatMessagesData,
  type ChatServiceConfig,
  type ChatStatus,
} from '@tdesign/web-components-chat/chat-engine';
import type { TdChatProps } from '@tdesign/web-components-chat/chatbot';

export interface UseChatReturn {
  chatEngine: Ref<InstanceType<typeof ChatEngine> | null>;
  messages: Ref<ChatMessagesData[]>;
  status: Ref<ChatStatus>;
}

export const useChat = (options: {
  defaultMessages: TdChatProps['defaultMessages'];
  chatServiceConfig: ChatServiceConfig;
}): UseChatReturn => {
  const messages: Ref<ChatMessagesData[]> = ref([]);
  const status: Ref<ChatStatus> = ref('idle');
  // 若 ChatEngine 内部状态包含冻结对象，可改用 shallowRef，避免 Vue 深层代理实例触发 Proxy invariant 错误。
  const chatEngineRef: Ref<InstanceType<typeof ChatEngine> | null> = ref(null);
  const msgSubscribeRef = ref<(() => void) | null>(null);
  const prevInitialMessages = ref<ChatMessagesData[]>([]);

  const syncState = (state: ChatMessagesData[]) => {
    messages.value = state;
    status.value = state[state.length - 1]?.status || 'idle';
  };

  const subscribeToChat = () => {
    if (!chatEngineRef.value) return;

    msgSubscribeRef.value = chatEngineRef.value.messageStore.subscribe((state) => {
      syncState(state.messages);
    });
  };

  const initChat = () => {
    chatEngineRef.value = new ChatEngine();
    chatEngineRef.value.init(options.chatServiceConfig, options.defaultMessages);
    syncState(options.defaultMessages || []);
    subscribeToChat();
  };

  onMounted(() => {
    initChat();
  });

  onUnmounted(() => {
    if (msgSubscribeRef.value) {
      msgSubscribeRef.value();
    }
  });

  // 监听 defaultMessages 变化
  watch(
    () => options.defaultMessages,
    (newMessages) => {
      // 检查 defaultMessages 是否真的发生了变化
      const hasChanged = JSON.stringify(prevInitialMessages.value) !== JSON.stringify(newMessages);

      if (hasChanged && newMessages && newMessages.length > 0) {
        // 更新引用
        prevInitialMessages.value = newMessages;

        // 重新初始化聊天引擎或更新消息
        if (chatEngineRef.value) {
          chatEngineRef.value.setMessages(newMessages, 'replace');

          // 同步状态
          syncState(newMessages);
        }
      }
    },
    { deep: true },
  );

  return {
    chatEngine: chatEngineRef,
    messages,
    status,
  };
};
