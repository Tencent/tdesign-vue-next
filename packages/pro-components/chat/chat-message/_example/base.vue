<script setup>
const message = {
  role: 'user',
  content: [
    {
      type: 'text',
      data: '牛顿第一定律是否适用于所有参考系？',
    },
  ],
};
</script>

<template>
  <t-space direction="vertical" style="width: 100%">
    <t-chat-message :content="message.content" :role="message.role" />
    <t-chat-message variant="base" :content="message.content" :role="message.role" />
    <t-chat-message variant="outline" :content="message.content" :role="message.role" />
  </t-space>
</template>
