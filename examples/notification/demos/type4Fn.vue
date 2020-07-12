<template>
  <div>
    <t-button @click="info">信息</t-button>
    <t-button @click="success">成功</t-button>
    <t-button @click="warning">警告</t-button>
    <t-button @click="error">错误</t-button>
  </div>
</template>

<script>
export default {
  methods: {
    info() {
      this.$notify.info({
        title: '信息',
        content: '这是一条可以自动关闭的消息通知',
        duration: 3000,
      });
    },
    success() {
      this.$notify.success({
        title: '成功',
        content: '这是一条可以自动关闭的消息通知',
        duration: 3000,
      });
    },
    warning() {
      this.$notify.warning({
        title: '警告',
        content: '这是一条可以自动关闭的消息通知',
        duration: 3000,
      });
    },
    error() {
      this.$notify.error({
        title: '错误',
        content: '这是一条可以自动关闭的消息通知',
        duration: 3000,
      });
    },
  },
};
</script>

<style scoped>
.t-button + .t-button{
  margin-left: 10px;
}
</style>
