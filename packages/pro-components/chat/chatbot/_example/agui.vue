<template>
  <div style="height: 600px; display: flex; flex-direction: column">
    <!-- 历史消息加载控制栏 -->
    <div style="padding: 12px; border-bottom: 1px solid #e7e7e7; background-color: #fafafa">
      <t-space>
        <t-button size="small" :loading="loadingHistory" @click="loadHistoryMessages"> 加载历史消息 </t-button>
        <t-button size="small" variant="text" @click="clearMessages"> 清空消息 </t-button>
      </t-space>
    </div>

    <t-chat-list ref="listRef" style="width: 100%; flex: 1">
      <t-chat-message
        v-for="(message, idx) in messages"
        :key="message.id"
        v-bind="messageProps[message.role]"
        :role="message.role"
        :content="message.content"
        allow-content-segment-custom
      >
        <template v-for="(item, index) in message.content" :key="index">
          <template v-if="item.type === 'reasoning'">
            <template v-for="(subItem, subIndex) in item.data" :key="`toolcall-${index}-${subIndex}`">
              <div :slot="`reasoning-toolcall-${subIndex}`" class="toolcall-wrapper">
                <CustomToolCallRenderer
                  v-if="subItem.type === 'toolcall'"
                  :tool-call="subItem.data"
                  :status="subItem.status"
                />
              </div>
            </template>
          </template>
        </template>

        <template #actionbar>
          <t-chat-actionbar
            v-if="isAIMessage(message) && message.status === 'complete'"
            :action-bar="getChatActionBar(idx === messages.length - 1)"
            :content="getMessageContentForCopy(message)"
            :comment="message.role === 'assistant' ? message.comment : ''"
            @actions="actionHandler"
          />
        </template>
      </t-chat-message>
    </t-chat-list>

    <t-chat-sender
      ref="inputRef"
      v-model="inputValue"
      placeholder="请输入内容"
      :loading="senderLoading"
      @change="inputChangeHandler"
      @send="sendHandler"
      @stop="stopHandler"
    >
      <template #suffix="{ renderPresets }">
        <!-- 在这里可以进行自由的组合使用，或者新增预设 -->
        <!-- 不需要附件操作的使用方式 -->
        <component :is="renderPresets([])" />
      </template>
    </t-chat-sender>
  </div>
</template>

<script setup lang="tsx">
import { ref, computed } from 'vue';
import {
  type TdChatMessageConfig,
  type ChatRequestParams,
  type ChatMessagesData,
  type TdChatActionsName,
  type TdChatSenderParams,
  type TdChatListApi,
  type TdChatSenderApi,
  isAIMessage,
  getMessageContentForCopy,
  AGUIAdapter,
} from '@tdesign-vue-next/chat';
import { MessagePlugin } from 'tdesign-vue-next';
import { useChat } from '../useChat';
import CustomToolCallRenderer from './components/Toolcall.vue';

const listRef = ref<TdChatListApi | null>(null);
const inputRef = ref<TdChatSenderApi | null>(null);
const inputValue = ref<string>('AG-UI协议的作用是什么');
const loadingHistory = ref<boolean>(false);

const { chatEngine, messages, status } = useChat({
  defaultMessages: [],
  // 聊天服务配置
  chatServiceConfig: {
    // 对话服务地址
    endpoint: `https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/agui-simple`,
    // 开启agui协议解析支持
    protocol: 'agui',
    stream: true,
    onStart: (chunk) => {
      console.log('onStart', chunk);
    },
    // 流式对话结束（aborted为true时，表示用户主动结束对话，params为请求参数）
    onComplete: (aborted: boolean, params: RequestInit, event) => {
      console.log('onComplete', aborted, params, event);
    },
    // 流式对话过程中出错业务自定义行为
    onError: (err: Error | Response) => {
      console.error('Chatservice Error:', err);
    },
    // 流式对话过程中用户主动结束对话业务自定义行为
    onAbort: async () => {},
    // 自定义请求参数
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
  },
});

const senderLoading = computed(() => {
  if (status.value === 'pending' || status.value === 'streaming') {
    return true;
  }
  return false;
});

// 加载历史消息
const loadHistoryMessages = async () => {
  loadingHistory.value = true;
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/conversation/history?type=simple`);
    const result = await response.json();
    if (result.success && result.data) {
      const messages = AGUIAdapter.convertHistoryMessages(result.data);
      chatEngine.value?.setMessages(messages);
      listRef.value?.scrollToBottom();
    }
  } catch (error) {
    console.error('加载历史消息出错:', error);
    MessagePlugin.error('加载历史消息出错');
  } finally {
    loadingHistory.value = false;
  }
};

// 清空消息
const clearMessages = () => {
  chatEngine.value?.clearMessages();
  MessagePlugin.success('已清空消息');
};

// 消息属性配置
const messageProps: TdChatMessageConfig = {
  user: {
    variant: 'base',
    placement: 'right',
  },
  assistant: {
    placement: 'left',
    // 内置的消息渲染配置
    chatContentProps: {
      thinking: {
        maxHeight: 300,
      },
      reasoning: {
        maxHeight: 300,
        defaultCollapsed: false,
      },
    },
  },
};

const getChatActionBar = (isLast: boolean): TdChatActionsName[] => {
  let filterActions: TdChatActionsName[] = ['replay', 'good', 'bad', 'copy'];
  if (!isLast) {
    // 只有最后一条AI消息才能重新生成
    filterActions = filterActions.filter((item) => item !== 'replay');
  }
  return filterActions;
};

const actionHandler = (name: string, data?: any) => {
  switch (name) {
    case 'replay': {
      chatEngine.value?.regenerateAIMessage();
      return;
    }
    default:
      console.log('触发action', name, 'data', data);
  }
};

const sendUserMessage = async (requestParams: ChatRequestParams) => {
  await chatEngine.value?.sendUserMessage(requestParams);
  listRef.value?.scrollToBottom();
};

// 输入变更处理
const inputChangeHandler = (value: string) => {
  inputValue.value = value;
};

// 发送处理
const sendHandler = async (params) => {
  if (senderLoading.value) {
    MessagePlugin.error('回答输出中，请稍后操作或点击停止回答');
  } else {
    await sendUserMessage({ prompt: params });
    inputValue.value = '';
  }
};

// 停止处理
const stopHandler = () => {
  chatEngine.value?.abortChat();
};
</script>

<style scoped>
.toolcall-wrapper {
  margin: 8px 0;
}
</style>
