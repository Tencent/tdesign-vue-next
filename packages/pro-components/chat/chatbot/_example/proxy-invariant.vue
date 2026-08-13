<template>
  <div class="proxy-invariant-demo">
    <p>
      附件使用普通 <code>ref</code>，不使用 <code>shallowRef</code> 或 <code>markRaw</code>。Web Component 可以接收
      Proxy，但写入 ChatEngine 消息状态时必须创建非 Proxy 的独立快照。
    </p>

    <section class="case-card">
      <p data-testid="input-proxy">Web Component 输入附件：{{ formatProxyState(inputProxy) }}</p>
      <p data-testid="message-proxy">ChatEngine 消息附件：{{ formatProxyState(messageProxy) }}</p>
      <p data-testid="send-status">发送状态：{{ sendStatus }}</p>
      <t-button @click="addAttachment">添加响应式附件</t-button>
      <t-chatbot
        id="proxy-boundary-chatbot"
        :default-messages="defaultMessages"
        :message-props="messageProps"
        :sender-props="senderProps"
        :chat-service-config="serviceConfig"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, isProxy, nextTick, ref } from 'vue';
import type {
  AIMessageContent,
  ChatMessagesData,
  ChatRequestParams,
  ChatServiceConfig,
  SSEChunkData,
  TdAttachmentItem,
  TdChatMessageConfigItem,
} from '@tdesign-vue-next/chat';

type ProxyState = boolean | null;

type ChatbotElement = HTMLElement & {
  props?: {
    senderProps?: {
      attachmentsProps?: {
        items?: TdAttachmentItem[];
      };
    };
  };
  chatMessageValue?: ChatMessagesData[];
};

const files = ref<TdAttachmentItem[]>([]);
const inputProxy = ref<ProxyState>(null);
const messageProxy = ref<ProxyState>(null);
const sendStatus = ref('等待发送');

const defaultMessages: ChatMessagesData[] = [
  {
    id: crypto.randomUUID(),
    role: 'assistant',
    status: 'complete',
    content: [{ type: 'text', status: 'complete', data: '添加附件后点击输入框右侧发送按钮。' }],
  },
];

const getChatbot = () => document.querySelector('#proxy-boundary-chatbot') as ChatbotElement | null;

const inspectInputBoundary = async () => {
  await nextTick();
  await nextTick();
  const items = getChatbot()?.props?.senderProps?.attachmentsProps?.items;
  inputProxy.value = items ? isProxy(items) || isProxy(items[0]) : null;
};

const inspectMessageBoundary = async () => {
  await nextTick();
  const userMessage = getChatbot()?.chatMessageValue?.find((message) => message.role === 'user');
  const attachmentContent = userMessage?.content?.find((content) => content.type === 'attachment');
  const items = attachmentContent?.type === 'attachment' ? attachmentContent.data : undefined;
  messageProxy.value = items ? isProxy(items) || isProxy(items[0]) : null;
};

const addAttachment = () => {
  files.value = [
    {
      name: 'reactive-attachment.txt',
      size: 1024,
      status: 'success',
      description: '1KB',
      url: 'https://example.com/reactive-attachment.txt',
    },
  ];
  sendStatus.value = '等待发送';
  messageProxy.value = null;
  void inspectInputBoundary();
};

const senderProps = computed(() => ({
  defaultValue: '发送带附件的消息',
  placeholder: '发送带附件的消息',
  actions: ['attachment', 'send'],
  attachmentsProps: {
    items: files.value,
    overflow: 'scrollX' as const,
  },
  uploadProps: {
    accept: '.pdf,.docx,.txt,.md',
  },
  onFileRemove: (event: CustomEvent<TdAttachmentItem[]>) => {
    files.value = [...event.detail];
    void inspectInputBoundary();
  },
}));

const messageProps = (message: ChatMessagesData): TdChatMessageConfigItem => ({
  variant: message.role === 'user' ? 'base' : 'text',
  placement: message.role === 'user' ? 'right' : 'left',
});

const mockEndpoint = `data:text/event-stream,${encodeURIComponent(
  `data: ${JSON.stringify({ answer: '附件发送成功' })}\n\n`,
)}`;

let sentWithAttachment = false;
const serviceConfig: ChatServiceConfig = {
  endpoint: mockEndpoint,
  stream: true,
  onRequest: (params: ChatRequestParams) => {
    sentWithAttachment = Boolean(params.attachments?.length);
    sendStatus.value = sentWithAttachment ? '发送中' : '未携带附件';
    return { method: 'GET' };
  },
  onMessage: (chunk: SSEChunkData): AIMessageContent => ({
    type: 'markdown',
    data: String((chunk.data as { answer?: string })?.answer ?? ''),
  }),
  onComplete: () => {
    sendStatus.value = sentWithAttachment ? '发送成功' : '未携带附件';
    void inspectMessageBoundary();
    return null;
  },
  onError: () => {
    sendStatus.value = '发送失败';
  },
};

const formatProxyState = (value: ProxyState) => {
  if (value == null) return '等待附件';
  return value ? 'Proxy' : '非 Proxy';
};
</script>

<style scoped>
.case-card {
  max-width: 680px;
  padding: 16px;
  border: 1px solid var(--td-component-border);
  border-radius: 8px;
}

.case-card t-chatbot {
  display: block;
  height: 420px;
  margin-top: 12px;
}
</style>
