<template>
  <t-space direction="vertical" style="width: 100%">
    <t-chat-message
      variant="text"
      avatar="https://tdesign.gtimg.com/site/chat-avatar.png"
      name="TDesignAI"
      :role="message.role"
      :content="message.content"
    >
      <!-- 植入插槽用来追加消息底部操作栏 -->
      <template #actionbar>
        <t-chat-actionbar
          :comment="comment"
          :content="message.content[0].data"
          :action-bar="['good', 'bad', 'replay', 'copy']"
          @actions="handleActions"
        />
      </template>
    </t-chat-message>
  </t-space>
</template>

<script setup>
const message = {
  id: '123123',
  role: 'assistant',
  content: [
    {
      type: 'text',
      data: '牛顿第一定律并不适用于所有参考系，它只适用于惯性参考系。在质点不受外力作用时，能够判断出质点静止或作匀速直线运动的参考系一定是惯性参考系，因此只有在惯性参考系中牛顿第一定律才适用。',
    },
  ],
};
</script>
