<template>
  <t-space>
    <t-button variant="outline" @click="openSomeNotification">点击打开多个通知</t-button>
    <t-button variant="outline" @click="closeAll" id="t-demo-msg-close-all">点击关闭所有通知</t-button>
  </t-space>
</template>

<script setup>
import { NotifyPlugin } from 'tdesign-vue';

const openSomeNotification = () => {
  NotifyPlugin.info({
    title: '这是第一条通知',
  });
  NotifyPlugin.warning({
    title: '这是第二条通知',
  });
  NotifyPlugin.error({
    title: '这是第三条通知',
  });
};
const closeAll = () => {
  NotifyPlugin.closeAll();
};
</script>
