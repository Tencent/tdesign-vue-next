<template>
  <div style="height: 600px">
    <t-chatbot
      ref="chatRef"
      :style="{ height: '100%' }"
      :default-messages="mockData"
      :message-props="messageProps"
      :sender-props="senderProps"
      :chat-service-config="chatServiceConfig"
      @message-change="handleMessageChange"
    >
      <template v-for="msg in mockMessage" :key="msg.id">
        <template v-for="(item, index) in msg.content" :key="`${msg.id}-${index}`">
          <div v-if="item.type === 'agent'" :slot="`${msg.id}-${item.type}-${index}`">
            <div style="padding-left: 10px; margin-top: 14px">
              <Timeline mode="same" theme="dot">
                <TimelineItem v-for="step in item.content.steps" :key="step.agent_id" label="">
                  <template #dot>
                    <CheckCircleFilledIcon :size="'medium'" :color="step?.status === 'finish' ? 'green' : '#ccc'" />
                  </template>
                  <div class="step">
                    <div class="title">{{ step.step }}</div>
                    <template v-if="step.tasks">
                      <div v-for="(task, taskIndex) in step.tasks" :key="`${step.agent_id}_task_${taskIndex}`">
                        <div :class="task.type">{{ task.text }}</div>
                      </div>
                    </template>
                  </div>
                </TimelineItem>
              </Timeline>
            </div>
          </div>
        </template>
      </template>
    </t-chatbot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type {
  TdChatMessageConfig,
  AIMessageContent,
  ChatRequestParams,
  ChatServiceConfig,
  ChatBaseContent,
  ChatMessagesData,
  SSEChunkData,
} from 'tdesign-web-components';
import { CheckCircleFilledIcon } from 'tdesign-icons-vue-next';
import { Timeline, TimelineItem } from 'tdesign-vue-next';
import { Bot } from '@tdesign-vue-next/chat';

// 类型扩展
declare module '@tdesign-vue-next/chat' {
  interface AIContentTypeOverrides {
    agent: ChatBaseContent<
      'agent',
      {
        id: string;
        state: 'pending' | 'command' | 'result' | 'finish';
        content: {
          steps?: {
            step: string;
            agent_id: string;
            status: string;
            tasks?: {
              type: 'command' | 'result';
              text: string;
            }[];
          }[];
          text?: string;
        };
      }
    >;
  }
}

// 默认初始化消息
const mockData: ChatMessagesData[] = [
  {
    id: '123',
    role: 'assistant',
    status: 'complete',
    content: [
      {
        type: 'text',
        data: '欢迎使用TDesign Agent家庭活动策划助手，请给我布置任务吧～',
      },
    ],
  },
];

const chatRef = ref<InstanceType<typeof Bot> | null>(null);
const mockMessage = ref<ChatMessagesData[]>(mockData);

// 消息属性配置
const messageProps: TdChatMessageConfig = {
  user: {
    variant: 'base',
    placement: 'right',
  },
  assistant: {
    placement: 'left',
  },
};

// 聊天服务配置
const chatServiceConfig: ChatServiceConfig = {
  endpoint: `https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/agent`,
  stream: true,
  onComplete: (aborted: boolean, params: RequestInit) => {
    console.log('onComplete', aborted, params);
  },
  onError: (err: Error | Response) => {
    console.error('Chatservice Error:', err);
  },
  onAbort: async () => {},
  onMessage: (chunk: SSEChunkData): AIMessageContent => {
    const { type, ...rest } = chunk.data;
    switch (type) {
      case 'text':
        return {
          type: 'markdown',
          data: rest?.msg || '',
        };
      case 'agent':
        return {
          type: 'agent',
          ...rest,
        };
      default:
        return {
          ...chunk.data,
          data: { ...chunk.data.content },
        };
    }
  },
  onRequest: (innerParams: ChatRequestParams) => {
    const { prompt } = innerParams;
    return {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        uid: 'agent_uid',
        prompt,
      }),
    };
  },
};

// 消息变更处理
const handleMessageChange = (e: CustomEvent<ChatMessagesData[]>) => {
  mockMessage.value = e.detail;
};

const senderProps = ref({
  defaultValue: '请帮我做一个5岁儿童生日聚会的规划',
});

// 注册合并策略
onMounted(() => {
  if (!chatRef.value) return;

  chatRef.value.registerMergeStrategy('agent', (newChunk, existing) => {
    // const updated = { ...existing };
    const updated = JSON.parse(JSON.stringify(existing));
    console.log(updated, 'updated');

    if (!updated.content.steps) updated.content.steps = [];

    const stepIndex = updated.content.steps.findIndex((step) => step.agent_id === newChunk.content.agent_id);

    if (stepIndex === -1) return updated;

    const step = {
      ...updated.content.steps[stepIndex],
      tasks: [...(updated.content.steps[stepIndex].tasks || [])],
      status: newChunk.state === 'finish' ? 'finish' : 'pending',
    };

    if (newChunk.state === 'command') {
      step.tasks.push({
        type: 'command',
        text: newChunk.content.text,
      });
    } else if (newChunk.state === 'result') {
      const resultTaskIndex = step.tasks.findIndex((task) => task.type === 'result');
      if (resultTaskIndex >= 0) {
        step.tasks[resultTaskIndex].text += newChunk.content.text;
      } else {
        step.tasks.push({
          type: 'result',
          text: newChunk.content.text,
        });
      }
    }
    console.log(step, 'step');

    updated.content.steps[stepIndex] = step;
    return updated;
  });
});
</script>

<style scoped>
.step {
  color: #4d4d4d;
}

.title {
  margin-bottom: 8px;
}

.command,
.result {
  font-size: 14px;
  line-height: 22px;
  margin: 6px 0;
}

.command {
  background-color: #efeff0;
  border-radius: 12px;
  display: inline-block; /* 内联块级元素使宽度自适应内容 */
  padding: 4px 8px;
  white-space: nowrap;
  width: fit-content; /* 宽度精确匹配内容 */
}
</style>
