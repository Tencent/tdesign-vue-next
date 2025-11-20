<template>
  <div style="height: 600px">
    <t-chatbot
      ref="chatRef"
      :default-messages="mockData"
      :message-props="messageProps"
      :sender-props="senderProps"
      :chat-service-config="chatServiceConfig"
    >
      <template #sender-footer-prefix>
        <div class="model-select">
          <t-tooltip v-model:visible="allowToolTip" content="切换模型" trigger="hover">
            <t-select
              v-model="selectValue"
              :options="selectOptions"
              value-type="object"
              @focus="allowToolTip.value = false"
            ></t-select>
          </t-tooltip>
          <t-button class="check-box" :class="{ 'is-active': isChecked }" variant="outline" @click="checkClick">
            <SystemSumIcon />
            <span>深度思考</span>
          </t-button>
        </div>
      </template>
    </t-chatbot>
  </div>
</template>

<script setup lang="tsx">
import { ref, watch } from 'vue';
import { SystemSumIcon } from 'tdesign-icons-vue-next';
import {
  type SSEChunkData,
  type AIMessageContent,
  type TdChatMessageConfigItem,
  type ChatRequestParams,
  type ChatMessagesData,
  type ChatServiceConfig,
  type TdChatbotApi,
} from '@tdesign-vue-next/chat';

// 默认初始化消息
const mockData: ChatMessagesData[] = [
  {
    id: '123',
    role: 'assistant',
    content: JSON.parse(
      JSON.stringify([
        {
          type: 'text',
          status: 'complete',
          data: '欢迎使用TDesign Chatbot智能助手，你可以这样问我：',
        },
        {
          type: 'suggestion',
          status: 'complete',
          data: [
            {
              title: '南极的自动提款机叫什么名字',
              prompt: '南极的自动提款机叫什么名字？',
            },
            {
              title: '南极自动提款机在哪里',
              prompt: '南极自动提款机在哪里',
            },
          ],
        },
      ]),
    ),
  },
];

const allowToolTip = ref(false);

const selectOptions = [
  {
    label: '默认模型',
    value: 'default',
  },
  {
    label: 'Deepseek',
    value: 'deepseek-r1',
  },
  {
    label: '混元',
    value: 'hunyuan',
  },
];
const selectValue = ref({
  label: '默认模型',
  value: 'default',
});
const isChecked = ref(false);
const checkClick = () => {
  isChecked.value = !isChecked.value;
};

const chatRef = ref<TdChatbotApi | null>(null);
const activeR1 = ref(false);
const activeSearch = ref(false);
const reqParamsRef = ref({ think: false, search: false });
// 消息属性配置
const messageProps = (msg: ChatMessagesData): TdChatMessageConfigItem => {
  const { role, content } = msg;
  const thinking = content.find((item) => item.type === 'thinking');
  if (role === 'user') {
    return {
      variant: 'base',
      placement: 'right',
      avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
    };
  }
  if (role === 'assistant') {
    return {
      placement: 'left',
      actions: ['replay', 'copy', 'good', 'bad'],
      handleActions: {
        good: async ({ message, active }) => {
          console.log('点赞', message, active);
        },
        bad: async ({ message, active }) => {
          console.log('点踩', message, active);
        },
        replay: ({ message, active }) => {
          console.log('自定义重新回复', message, active);
          chatRef.value?.regenerate();
        },
        searchItem: ({ content, event }) => {
          event.preventDefault();
          console.log('点击搜索条目', content);
        },
        suggestion: ({ content }) => {
          console.log('点击建议问题', content);
          chatRef.value?.addPrompt(content.prompt);
        },
      },
      chatContentProps: {
        thinking: {
          maxHeight: 100,
          layout: 'block',
          collapsed: thinking?.status === 'complete',
        },
      },
    };
  }
  return {};
};

// 聊天服务配置
const chatServiceConfig: ChatServiceConfig = ref({
  endpoint: `https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal`,
  stream: true,
  onComplete: (aborted: boolean, params: RequestInit) => {
    console.log('onComplete', aborted, params);
  },
  onError: (err: Error | Response) => {
    console.error('Chatservice Error:', err);
  },
  onAbort: async () => {},
  onMessage: (chunk: SSEChunkData): AIMessageContent => {
    const { type, ...rest } = chunk.data as any;
    switch (type) {
      case 'search':
        return {
          type: 'search',
          data: {
            title: rest.title || `搜索到${rest?.docs?.length}条内容`,
            references: rest?.content, // 深度克隆
          },
        };
      case 'think':
        return {
          type: 'thinking',
          status: /耗时/.test(rest?.title) ? 'complete' : 'streaming',
          data: {
            title: rest.title || '深度思考中',
            text: rest.content || '', // 深度克隆
          },
        };
      case 'text':
        return {
          type: 'markdown',
          data: rest?.msg || '',
        };
      default:
        return { type: 'text', data: '' };
    }
  },
  onRequest: (innerParams: ChatRequestParams) => {
    const { prompt } = innerParams;
    return {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        uid: 'tdesign-chat',
        prompt,
        ...reqParamsRef.value,
      }),
    };
  },
});

// 监听状态变化
watch(
  [activeR1, activeSearch],
  ([newR1, newSearch]) => {
    reqParamsRef.value = {
      think: newR1,
      search: newSearch,
    };
  },
  { immediate: true },
);

// 发送者属性
const senderProps = {
  placeholder: '有问题，尽管问～ Enter 发送，Shift+Enter 换行',
};
</script>
<style lang="less">
t-chatbot {
  .model-select {
    display: flex;
    align-items: center;
    .t-select {
      width: 112px;
      height: var(--td-comp-size-m);
      margin-right: var(--td-comp-margin-s);
      .t-input {
        border-radius: 32px;
        padding: 0 15px;
      }
      .t-input.t-is-focused {
        box-shadow: none;
      }
    }
    .check-box {
      width: 112px;
      height: var(--td-comp-size-m);
      border-radius: 32px;
      box-sizing: border-box;
      flex: 0 0 auto;
      .t-button__text {
        display: flex;
        align-items: center;
        justify-content: center;
        span {
          margin-left: var(--td-comp-margin-s);
        }
      }
    }
    .check-box.is-active {
      border: 1px solid var(--td-brand-color-focus);
      background: var(--td-brand-color-light);
      color: var(--td-text-color-brand);
    }
  }
}
</style>
