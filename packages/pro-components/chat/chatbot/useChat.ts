import { ref, onMounted, onUnmounted, type Ref } from 'vue';
import type { ChatMessagesData, ChatStatus, ChatServiceConfig } from 'tdesign-web-components/lib/chatbot/core/type';
import { TdChatProps } from 'tdesign-web-components';
import ChatEngine from 'tdesign-web-components/lib/chatbot/core';

export const useChat = (options: {
  defaultMessages: TdChatProps['defaultMessages'];
  chatServiceConfig: ChatServiceConfig;
}) => {
  const messages: Ref<ChatMessagesData[]> = ref([]);
  const status: Ref<ChatStatus> = ref('idle');
  const chatEngineRef = ref<ChatEngine | null>(null);
  const msgSubscribeRef = ref<(() => void) | null>(null);

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

  return {
    chatEngine: chatEngineRef,
    messages,
    status,
  };
};
