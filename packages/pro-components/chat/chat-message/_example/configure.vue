<script setup>
const messages = {
  ai: {
    id: '11111',
    role: 'assistant',
    content: [
      {
        type: 'text',
        data: '牛顿第一定律并不适用于所有参考系，它只适用于惯性参考系。在质点不受外力作用时，能够判断出质点静止或作匀速直线运动的参考系一定是惯性参考系，因此只有在惯性参考系中牛顿第一定律才适用。',
      },
    ],
  },
  user: {
    id: '22222',
    role: 'user',
    content: [
      {
        type: 'text',
        data: '牛顿第一定律是否适用于所有参考系？',
      },
    ],
  },
  system: {
    id: '33333',
    role: 'system',
    content: [
      {
        type: 'text',
        data: '模型由 hunyuan 变为 GPT4',
      },
    ],
  },
  error: {
    id: '4444',
    role: 'assistant',
    status: 'error',
    content: [
      {
        type: 'text',
        data: '数据解析失败',
      },
    ],
  },
};
</script>

<template>
  <t-space direction="vertical" style="width: 100%">
    <t-divider>可配置角色，头像，昵称，时间</t-divider>
    <t-chat-message
      avatar="https://tdesign.gtimg.com/site/avatar.jpg"
      datetime="今天16:38"
      name="张三"
      role="user"
      :content="messages.user.content"
    />
    <t-chat-message
      avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
      datetime="今天16:43"
      name="TDesignAI"
      role="assistant"
      :content="messages.ai.content"
    />
    <t-divider>可配置位置</t-divider>
    <t-chat-message placement="right" variant="base" role="user" :content="messages.user.content" />
    <t-chat-message placement="left" role="assistant" :content="messages.ai.content" />
    <t-divider>角色为system的系统消息</t-divider>
    <t-chat-message :content="messages.system.content" role="system" />
  </t-space>
</template>
