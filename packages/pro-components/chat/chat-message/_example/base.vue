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
  <Space direction="vertical" style="width: 100%">
    <t-chat-message :message="message" />
    <t-chat-message variant="base" :message="message" />
    <t-chat-message variant="outline" :message="message" />
  </Space>
</template>
