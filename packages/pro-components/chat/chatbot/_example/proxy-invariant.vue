<template>
  <div class="proxy-invariant-demo">
    <p>
      三组使用相同附件和发送流程，只改变 Vue 侧声明方式。Web Component 保持原始请求附件，并在写入 ChatEngine
      消息状态前创建独立快照。
    </p>

    <section v-for="item in cases" :key="item.id" class="case-card" :data-testid="`${item.id}-case`">
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <p :data-testid="`${item.id}-source-proxy`">Vue 业务附件：{{ formatProxyState(item.sourceProxy.value) }}</p>
      <p :data-testid="`${item.id}-input-proxy`">
        Web Component 输入附件：{{ formatProxyState(item.inputProxy.value) }}
      </p>
      <p :data-testid="`${item.id}-request`">onRequest 用户附件：{{ item.requestState.value }}</p>
      <p :data-testid="`${item.id}-message-proxy`">
        ChatEngine 消息附件：{{ formatProxyState(item.messageProxy.value) }}，{{ item.messageOwnership.value }}
      </p>
      <p :data-testid="`${item.id}-send-status`">发送状态：{{ item.sendStatus.value }}</p>
      <t-button @click="item.addAttachment">添加响应式附件</t-button>
      <t-chatbot
        :id="item.chatbotId"
        :default-messages="item.defaultMessages"
        :message-props="messageProps"
        :sender-props="item.senderProps.value"
        :chat-service-config="item.serviceConfig"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, isProxy, markRaw, nextTick, ref, shallowRef, type Ref } from 'vue';
import type {
  AIMessageContent,
  ChatMessagesData,
  ChatRequestParams,
  ChatServiceConfig,
  SSEChunkData,
  TdAttachmentItem,
  TdChatMessageConfigItem,
} from '@tdesign-vue-next/chat';

type CaseMode = 'ref' | 'markRaw' | 'shallowRef';
type ProxyState = boolean | null;

type LocalAttachment = TdAttachmentItem & {
  response: { fileId: string };
  customField: string;
};

type ChatbotElement = HTMLElement & {
  props?: {
    senderProps?: {
      attachmentsProps?: {
        items?: LocalAttachment[];
      };
    };
  };
  chatMessageValue?: ChatMessagesData[];
};

const waitForRender = async () => {
  await nextTick();
  await nextTick();
};

const createCase = (mode: CaseMode, title: string, description: string) => {
  const files: Ref<LocalAttachment[]> = mode === 'shallowRef' ? shallowRef([]) : ref([]);
  const sourceProxy = ref<ProxyState>(null);
  const inputProxy = ref<ProxyState>(null);
  const messageProxy = ref<ProxyState>(null);
  const messageOwnership = ref('等待发送');
  const requestState = ref('等待发送');
  const sendStatus = ref('等待发送');
  const chatbotId = `proxy-boundary-chatbot-${mode}`;
  let boundaryItems: LocalAttachment[] | undefined;
  let sentWithAttachment = false;

  const defaultMessages: ChatMessagesData[] = [
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      status: 'complete',
      content: [{ type: 'text', status: 'complete', data: '添加附件后点击输入框右侧发送按钮。' }],
    },
  ];

  const getChatbot = () => document.querySelector(`#${chatbotId}`) as ChatbotElement | null;

  const inspectInputBoundary = async () => {
    await waitForRender();
    boundaryItems = getChatbot()?.props?.senderProps?.attachmentsProps?.items;
    sourceProxy.value = isProxy(files.value) || isProxy(files.value[0]);
    inputProxy.value = boundaryItems ? isProxy(boundaryItems) || isProxy(boundaryItems[0]) : null;
  };

  const inspectMessageBoundary = async () => {
    await waitForRender();
    const userMessage = getChatbot()?.chatMessageValue?.find((message) => message.role === 'user');
    const attachmentContent = userMessage?.content?.find((content) => content.type === 'attachment');
    const items = attachmentContent?.type === 'attachment' ? attachmentContent.data : undefined;
    messageProxy.value = items ? isProxy(items) || isProxy(items[0]) : null;
    messageOwnership.value =
      items && items !== files.value && items[0] !== files.value[0] ? '已与 Vue 业务对象隔离' : '未隔离';
  };

  const addAttachment = () => {
    files.value = [
      {
        key: `${mode}-attachment`,
        name: `${mode}-attachment.txt`,
        size: 1024,
        status: 'success',
        description: '1KB',
        url: `https://example.com/${mode}-attachment.txt`,
        response: { fileId: `${mode}-file-id` },
        customField: `${mode}-custom-value`,
      },
    ];
    sendStatus.value = '等待发送';
    requestState.value = '等待发送';
    messageProxy.value = null;
    messageOwnership.value = '等待发送';
    void inspectInputBoundary();
  };

  const createSenderProps = () => ({
    defaultValue: `发送 ${mode} 附件`,
    placeholder: `发送 ${mode} 附件`,
    actions: ['attachment', 'send'],
    attachmentsProps: {
      items: files.value,
      overflow: 'scrollX' as const,
    },
    uploadProps: {
      accept: '.pdf,.docx,.txt,.md',
    },
    onFileRemove: (event: CustomEvent<LocalAttachment[]>) => {
      files.value = [...event.detail];
      void inspectInputBoundary();
    },
  });

  const senderProps = computed(() => {
    const value = createSenderProps();
    return mode === 'markRaw' ? markRaw(value) : value;
  });

  const mockEndpoint = `data:text/event-stream,${encodeURIComponent(
    `data: ${JSON.stringify({ answer: `${mode} 附件发送成功` })}\n\n`,
  )}`;

  const serviceConfig: ChatServiceConfig = {
    endpoint: mockEndpoint,
    stream: true,
    onRequest: (params: ChatRequestParams) => {
      const requestItems = params.attachments as unknown as LocalAttachment[] | undefined;
      const attachment = requestItems?.[0];
      sentWithAttachment = Boolean(attachment);
      const sameReferences = requestItems === boundaryItems && attachment === boundaryItems?.[0];
      requestState.value =
        attachment?.response?.fileId === `${mode}-file-id` &&
        attachment.customField === `${mode}-custom-value` &&
        sameReferences
          ? '完整且引用未改变'
          : '字段或引用已改变';
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

  return {
    id: mode,
    title,
    description,
    chatbotId,
    defaultMessages,
    sourceProxy,
    inputProxy,
    messageProxy,
    messageOwnership,
    requestState,
    sendStatus,
    senderProps,
    serviceConfig,
    addAttachment,
  };
};

const cases = [
  createCase('ref', '普通 ref', '附件数组和元素由 Vue 深度代理。'),
  createCase('markRaw', 'markRaw(senderProps)', '保留现有 markRaw 兼容用法。'),
  createCase('shallowRef', 'shallowRef(files)', '附件数组只追踪整体替换，不深度代理元素。'),
];

const messageProps = (message: ChatMessagesData): TdChatMessageConfigItem => ({
  variant: message.role === 'user' ? 'base' : 'text',
  placement: message.role === 'user' ? 'right' : 'left',
});

const formatProxyState = (value: ProxyState) => {
  if (value == null) return '等待附件';
  return value ? 'Proxy' : '非 Proxy';
};
</script>

<style scoped>
.proxy-invariant-demo {
  display: grid;
  gap: 20px;
}

.case-card {
  padding: 16px;
  border: 1px solid var(--td-component-border);
  border-radius: 8px;
}

.case-card h3 {
  margin-top: 0;
}

.case-card t-chatbot {
  display: block;
  height: 420px;
  margin-top: 12px;
}
</style>
