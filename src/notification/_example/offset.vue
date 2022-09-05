<template>
  <t-space>
    <t-button variant="outline" @click="showInOffset">偏移的信息</t-button>
    <t-button variant="outline" @click="showInOffset2">偏移的信息</t-button>
  </t-space>
</template>
<script setup>
import { NotifyPlugin } from 'tdesign-vue-next';

const showInOffset = () => {
  NotifyPlugin({
    title: '标题名称',
    content: '这是一条可以自动关闭的消息通知',
    offset: {
      top: 30,
      right: 30,
    },
    duration: 3000,
  });
};

const showInOffset2 = () => {
  NotifyPlugin({
    title: '标题名称',
    content: '这是一条可以自动关闭的消息通知',
    placement: 'top-left',
    offset: {
      top: 30,
      left: 30,
    },
    duration: 3000,
  });
};
</script>
