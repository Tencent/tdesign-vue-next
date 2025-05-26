<template>
  <t-chat-ai
    ref="chatAreaRef"
    :welcome="welcome"
    layout="single"
    :user-meta="userMeta"
    :assistant-meta="assistantMeta"
    class="chat-ai"
    :operation-btn="['copy', 'replay']"
    :footer="true"
    :show-user-msg="true"
    :chat-request="chatRequest"
    @operation="handleOperation"
    @clear="handleClearChat"
  >
  </t-chat-ai>
</template>
<script setup>
import { ref } from 'vue';
const chatAreaRef = ref(null);
const userMeta = {
  avatar: 'https://tdesign.gtimg.com/site/avatar.jpg',
  name: '自己',
};
const assistantMeta = {
  avatar: 'https://tdesign.gtimg.com/site/chat-avatar.png',
  name: 'TDesignAI',
};
const welcome = ref(['你有什么要问我的吗？', '你好，有什么可以帮到你的吗？']);
const handleOperation = (type, options) => {
  // type 操作类型 good bad replay
  console.log('handleOperation', type, options);
};
const handleClearChat = () => {
  console.log('handleClearChat');
};
/**
 * 聊天入参
 * @param {Array} params.messages 消息列表
 * @param {AbortSignal} params.signal 终止请求
 * */

const chatRequest = async (params) => {
  const { messages, cancel } = params;
  const controller = new AbortController();
  const { signal } = controller;
  cancel?.(controller);
  // 存在安全风险，不推荐明文传入apiKey，推荐通过接口代理
  const apiKey = 'your-api-key';
  const response = await fetch('//hunyuanapi.woa.com/openapi/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer${apiKey ? ` ${apiKey}` : ''}`,
    },
    body: JSON.stringify({
      messages, // 消息列表
      model: 'hunyuan', // 模型
      stream: true, // 流式
    }),
    signal,
  });
  return response;
};
</script>
<style scoped>
.chat-ai {
  height: 600px;
}
</style>
