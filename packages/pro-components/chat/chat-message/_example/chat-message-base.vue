<script setup>
const message = {
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
    <t-chat-message :message="message" />
    <t-chat-message variant="base" :message="message" />
    <t-chat-message variant="outline" :message="message" />
  </t-space>
</template>
