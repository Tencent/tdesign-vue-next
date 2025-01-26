<template>
  <t-space>
    <t-button variant="outline" @click="info">信息</t-button>
    <t-button variant="outline" @click="success">成功</t-button>
    <t-button variant="outline" @click="warning">警告</t-button>
    <t-button variant="outline" @click="error">错误</t-button>
  </t-space>
</template>
<script lang="ts" setup>
import { NotifyPlugin, ButtonProps } from 'tdesign-vue-next';
const info: ButtonProps['onClick'] = () => {
  NotifyPlugin.info({
    title: '信息',
    content: '这是一条可以自动关闭的消息通知',
    duration: 3000,
  });
};
const success: ButtonProps['onClick'] = () => {
  NotifyPlugin.success({
    title: '成功',
    content: '这是一条可以自动关闭的消息通知',
    duration: 3000,
  });
};
const warning: ButtonProps['onClick'] = () => {
  NotifyPlugin.warning({
    title: '警告',
    content: '这是一条可以自动关闭的消息通知',
    duration: 3000,
  });
};
const error: ButtonProps['onClick'] = () => {
  NotifyPlugin.error({
    title: '错误',
    content: '这是一条可以自动关闭的消息通知',
    duration: 3000,
  });
};
</script>
