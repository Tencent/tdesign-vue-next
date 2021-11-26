<template>
  <div>
    <t-button @click="info"> 信息 </t-button>
    <t-button @click="success"> 成功 </t-button>
    <t-button @click="warning"> 警告 </t-button>
    <t-button @click="error"> 错误 </t-button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { NotifyPlugin } from '@tencent/tdesign-vue-next';

export default defineComponent({
  setup() {
    return {
      info() {
        NotifyPlugin.info({
          title: '信息',
          content: '这是一条可以自动关闭的消息通知',
          duration: 3000,
        });
      },
      success() {
        NotifyPlugin.success({
          title: '成功',
          content: '这是一条可以自动关闭的消息通知',
          duration: 3000,
        });
      },
      warning() {
        NotifyPlugin.warning({
          title: '警告',
          content: '这是一条可以自动关闭的消息通知',
          duration: 3000,
        });
      },
      error() {
        NotifyPlugin.error({
          title: '错误',
          content: '这是一条可以自动关闭的消息通知',
          duration: 3000,
        });
      },
    };
  },
});
</script>

<style scoped>
.t-button + .t-button {
  margin-left: 10px;
}
</style>
