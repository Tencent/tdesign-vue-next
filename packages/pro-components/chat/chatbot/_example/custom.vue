<template>
  <div style="height: 598px; margin-top: 12px">
    <t-chatbot
      ref="chatRef"
      style="height: 100%"
      :default-messages="initMessage"
      :message-props="messageProps"
      :sender-props="senderProps"
      :chat-service-config="chatServiceConfig"
      @messageChange="handleMessageChange"
    >
      <!-- 自定义消息体渲染插槽 -->
      <template v-for="msg in mockMessage" :key="msg.id">
        <template v-for="(item, index) in msg.content" :key="`${msg.id}-${item.data.id}`">
          <div
            v-if="item.type === 'chart'"
            :slot="`${msg.id}-${item.type}-${index}`"
            style="width: 600px; height: 400px"
          >
            <TvisionTcharts
              class="chart"
              :chart-type="item.data.chartType"
              :options="item.data.options"
              :theme="item.data.theme"
            />
          </div>
        </template>
      </template>
      <!-- 自定义消息操作区 -->
      <template v-for="data in mockMessage" :key="`${data.id}-actionbar`">
        <template v-if="data.role === 'assistant' && data.status === 'complete'">
          <div :slot="`${data.id}-actionbar`">
            <t-space size="small" style="margin-top: 6px">
              <t-button shape="square" variant="text" size="small">
                <sound-icon />
              </t-button>
              <t-button shape="square" variant="text" size="small">
                <edit-icon />
              </t-button>
              <t-button shape="square" variant="text" size="small">
                <copy-icon />
              </t-button>
            </t-space>
          </div>
        </template>
      </template>
    </t-chatbot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { SoundIcon, EditIcon, CopyIcon } from 'tdesign-icons-vue-next';
import {
  type SSEChunkData,
  type TdChatMessageConfig,
  type AIContentChunkUpdate,
  type ChatRequestParams,
  type ChatServiceConfig,
  type ChatBaseContent,
  type ChatMessagesData,
} from '@tdesign-vue-next/chat';
import TvisionTcharts from 'tvision-charts-vue-next';

const initMessage: ChatMessagesData[] = [
  {
    id: '123',
    role: 'assistant',
    content: [
      {
        type: 'text',
        status: 'complete',
        data: '你好！我是 TDesign 智能助手，有什么可以帮助你的吗？',
      },
    ],
  },
];

const chatRef = ref(null);
const mockMessage = ref<ChatMessagesData[]>(initMessage);

// 消息属性配置
const messageProps: TdChatMessageConfig = {
  user: {
    variant: 'base',
    placement: 'right',
  },
  assistant: {
    placement: 'left',
    chatContentProps: {
      thinking: {
        maxHeight: 100,
      },
    },
  },
};

// 发送者属性
const senderProps = {
  defaultValue: '北京今天早晚高峰交通情况如何，需要分别给出曲线图表示每个时段',
};

// 聊天服务配置
const chatServiceConfig: ChatServiceConfig = {
  // 对话服务地址
  endpoint: `https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal`,
  stream: true,
  // 流式对话结束（aborted为true时，表示用户主动结束对话，params为请求参数）
  onComplete: (aborted: boolean, params: RequestInit) => {
    console.log('onComplete', aborted, params);
  },
  // 流式对话过程中出错业务自定义行为
  onError: (err: Error | Response) => {
    console.error('Chatservice Error:', err);
  },
  // 流式对话过程中用户主动结束对话业务自定义行为
  onAbort: async () => {},
  // 流式消息输出时的回调
  onMessage: (chunk: SSEChunkData): AIContentChunkUpdate => {
    const { type, ...rest } = chunk.data as any;
    switch (type) {
      // 正文
      case 'text':
        return {
          type: 'markdown',
          data: rest?.msg || '',
          // 根据后端返回的paragraph字段来决定是否需要另起一段展示markdown
          strategy: rest?.paragraph === 'next' ? 'append' : 'merge',
        };
      // 3、自定义渲染图表所需的数据结构
      case 'chart':
        return {
          type: 'chart',
          data: {
            id: Date.now(),
            ...chunk.data.content,
          },
          // 图表每次出现都是追加创建新的内容块
          strategy: 'append',
        };
    }
  },
  // 自定义请求参数
  onRequest: (innerParams: ChatRequestParams) => {
    const { prompt } = innerParams;
    return {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        uid: 'test',
        prompt,
        chart: true,
      }),
    };
  },
};

// 消息变更处理
const handleMessageChange = (e: CustomEvent<ChatMessagesData[]>) => {
  mockMessage.value = e.detail;
  console.log(mockMessage.value);

  // 如果最后一条消息状态变为complete，强制更新视图
  if (mockMessage.value.length > 0) {
    const lastMessage = mockMessage.value[mockMessage.value.length - 1];
    if (lastMessage.role === 'assistant' && lastMessage.status === 'complete') {
      console.log('update');
      // 使用setTimeout确保所有DOM更新完成
      setTimeout(() => {
        // 强制更新组件
        console.log(chatRef.value, 'chatRef.value');

        chatRef.value?.$forceUpdate?.();
      }, 0);
    }
  }
};
</script>
<style scoped>
.chart {
  width: 600px;
  height: 400px;
}
</style>
