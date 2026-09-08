import { ref, shallowRef, onMounted, onUnmounted, watch, type Ref } from 'vue';
import { ChatEngine } from '@tdesign/web-components-chat/chat-engine';
import type {
  ChatMessagesData,
  ChatStatus,
  ChatServiceConfigSetter,
  IChatEngine,
} from '@tdesign/web-components-chat/chat-engine';
import type { TdChatProps } from '@tdesign/web-components-chat';

export interface UseChatReturn {
  chatEngine: Ref<IChatEngine | null>;
  messages: Ref<ChatMessagesData[]>;
  status: Ref<ChatStatus>;
}

export const useChat = (options: {
  defaultMessages: TdChatProps['defaultMessages'];
  chatServiceConfig: ChatServiceConfigSetter;
}): UseChatReturn => {
  const messages: Ref<ChatMessagesData[]> = ref([]);
  const status: Ref<ChatStatus> = ref('idle');
  // ChatEngine 内含类实例和私有状态，使用 shallowRef 避免 Vue 深层解包破坏其类型。
  const chatEngineRef = shallowRef<IChatEngine | null>(null);
  const msgSubscribeRef = ref<(() => void) | null>(null);
  const prevInitialMessages = ref<ChatMessagesData[]>([]);
  let mounted = false;

  const syncState = (state: ChatMessagesData[]) => {
    messages.value = state;
    status.value = state[state.length - 1]?.status || 'idle';
  };

  const subscribeToChat = () => {
    if (!chatEngineRef.value) return;

    msgSubscribeRef.value?.();
    msgSubscribeRef.value = chatEngineRef.value.messageStore.subscribe((state) => {
      syncState(state.messages);
    });
  };

  const initChat = async () => {
    chatEngineRef.value = new ChatEngine();
    await chatEngineRef.value.init(options.chatServiceConfig, options.defaultMessages);
    if (!mounted) return;
    syncState(options.defaultMessages || []);
    subscribeToChat();
  };

  onMounted(() => {
    mounted = true;
    initChat();
  });

  onUnmounted(() => {
    mounted = false;
    if (msgSubscribeRef.value) {
      msgSubscribeRef.value();
    }
    chatEngineRef.value?.destroy();
    chatEngineRef.value = null;
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
