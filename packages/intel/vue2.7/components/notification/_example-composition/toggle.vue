<template>
  <t-space>
    <t-button variant="outline" @click="toggle">自由控制关闭时机（{{ notification ? '关闭' : '打开' }}）</t-button>
  </t-space>
</template>

<script setup>
import { NotifyPlugin } from 'tdesign-vue';
import { ref } from 'vue';

const notification = ref(null);
const toggle = () => {
  if (!notification.value) {
    notification.value = NotifyPlugin.info({
      title: '标题名称',
      content: '这是一条需要手动关闭的消息通知',
      duration: 0,
    });
  } else {
    // this.notification.then(ins => ins.close()); // 另一种关闭方法
    NotifyPlugin.close(notification.value);
    notification.value = null;
  }
};
</script>

<style scoped>
.t-button + .t-button {
  margin-left: 16px;
}
</style>
