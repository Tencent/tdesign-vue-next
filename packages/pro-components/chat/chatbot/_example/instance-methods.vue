<template>
  <div>
    <!-- 操作按钮区域 -->
    <div class="operations-container">
      <div class="operations-panel">
        <div class="operations-title">快捷指令：</div>
        <div class="operations-buttons">
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleSendUserMessage">
            发送用户消息
          </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleSendAIMessage">
            发送AI消息
          </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleSendSystemMessage">
            发送系统消息
          </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleSetMessages">
            批量设置消息
          </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleClearMessages"> 清空消息 </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleRegenerate"> 重新生成 </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleAbort"> 中止请求 </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleScrollToBottom">
            滚动列表
          </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleAddPrompt"> 填充提示语 </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleSelectFile"> 选择文件 </t-button>
          <t-button size="small" variant="outline" :disabled="!ready" @click="handleGetStatus"> 获取状态 </t-button>
        </div>
      </div>
    </div>

    <!-- 聊天组件 -->
    <div style="height: 400px">
      <t-chatbot ref="chatRef" :chat-service-config="chatServiceConfig" @chat-ready="handleChatReady" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  type SSEChunkData,
  type AIMessageContent,
  type ChatServiceConfig,
  type TdChatbotApi,
} from '@tdesign-vue-next/chat';
import { MessagePlugin } from 'tdesign-vue-next';

/**
 * 实例方法示例
 *
 * 学习目标：
 * - 通过 ref 获取组件实例
 * - 调用实例方法控制组件行为
 * - 了解各种实例方法的使用场景
 *
 * 方法分类：
 * 1. 消息设置：sendUserMessage、sendAIMessage、setMessages
 * 2. 发送控制: addPrompt、regenerate、abortChat、selectFile、scrollList
 * 3. 获取状态
 */

const chatRef = ref<TdChatbotApi | null>(null);
const ready = ref(false);

// 聊天服务配置
const chatServiceConfig: ChatServiceConfig = {
  endpoint: 'https://1257786608-9i9j1kpa67.ap-guangzhou.tencentscf.com/sse/normal',
  stream: true,
  onMessage: (chunk: SSEChunkData): AIMessageContent => {
    const { ...rest } = chunk.data as any;
    return {
      type: 'markdown',
      data: rest?.msg || '',
    };
  },
};

// 组件就绪回调
const handleChatReady = () => {
  console.log('ChatEngine 已就绪');
  ready.value = true;
};

// 1. 发送用户消息
const handleSendUserMessage = () => {
  chatRef.value?.sendUserMessage({
    prompt: '这是通过实例方法发送的用户消息',
  });
};

const handleSendAIMessage = () => {
  chatRef.value?.sendAIMessage({
    content: [
      {
        type: 'text',
        data: '这是通过实例方法发送的AI回答',
      },
    ],
    sendRequest: false,
  });
};

// 2. 发送系统消息
const handleSendSystemMessage = () => {
  chatRef.value?.sendSystemMessage('这是一条系统通知消息');
};

// 3. 添加提示语到输入框
const handleAddPrompt = () => {
  chatRef.value?.addPrompt('请介绍一下 TDesign');
};

// 4. 设置消息
const handleSetMessages = () => {
  chatRef.value?.setMessages(
    [
      {
        id: `msg-${Date.now()}`,
        role: 'assistant',
        content: [{ type: 'text', data: '这是通过 setMessages 设置的消息' }],
        status: 'complete',
      },
    ],
    'replace',
  );
};

// 5. 清空消息
const handleClearMessages = () => {
  chatRef.value?.clearMessages();
};

// 6. 重新生成最后一条消息
const handleRegenerate = () => {
  chatRef.value?.regenerate();
};

// 7. 中止当前请求
const handleAbort = () => {
  chatRef.value?.abortChat();
  MessagePlugin.info('已中止当前请求');
};

// 8. 滚动列表
const handleScrollToBottom = () => {
  chatRef.value?.scrollList({ to: 'bottom', behavior: 'smooth' });
};

// 9. 触发文件选择
const handleSelectFile = () => {
  chatRef.value?.selectFile();
};

// 10. 获取当前状态
const handleGetStatus = () => {
  const status = {
    isChatEngineReady: chatRef.value?.isChatEngineReady,
    chatStatus: chatRef.value?.chatStatus,
    senderLoading: chatRef.value?.senderLoading,
    messagesCount: chatRef.value?.chatMessageValue?.length || 0,
  };
  console.log('当前状态:', status);
  MessagePlugin.info(`状态: ${status.chatStatus}, 消息数: ${status.messagesCount}`);
};
</script>

<style scoped lang="less">
.operations-container {
  margin-bottom: 16px;

  .operations-panel {
    margin-bottom: 16px;
    padding: 12px;
    background: #f5f5f5;
    border-radius: 4px;

    .operations-title {
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 500;
    }

    .operations-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
}
</style>
