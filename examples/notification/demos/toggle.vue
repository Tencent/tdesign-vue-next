<template>
  <div>
    <t-button variant="outline" @click="toggle">
      自由控制关闭时机（{{ notificationFlag ? '关闭' : '打开' }}）
    </t-button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NotifyPlugin } from 'tdesign-vue-next';

const notificationFlag = ref(null);
const toggle = () => {
  if (!notificationFlag.value) {
    notificationFlag.value = NotifyPlugin.info({
      title: '标题名称',
      content: '这是一条需要手动关闭的消息通知',
      duration: 0,
    });
  } else {
    NotifyPlugin.close(notificationFlag.value);
    notificationFlag.value = null;
  }
};
</script>

<style scoped>
.t-button + .t-button {
  margin-left: 16px;
}
</style>
