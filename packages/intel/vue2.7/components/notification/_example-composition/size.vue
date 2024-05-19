<template>
  <t-space direction="vertical" :size="20">
    <t-notification title="宽度固定400px" content="这是一条消息通知" />
    <t-notification title="文本内容最多支持三行" :content="content" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const content = ref(`这是一条内容为******************************
      ****************************************************
      ****************************************************
      *********************的消息通知`);
</script>
