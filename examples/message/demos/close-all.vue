<template>
  <div>
    <t-button @click="openSomeMsg">点击打开多个消息</t-button>
    <t-button @click="closeAll" id="t-demo-msg-close-all">点击关闭所有消息</t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: null,
    };
  },
  methods: {
    openSomeMsg() {
      this.$message.info('这是第一条消息');
      this.$message.warning('这是第二条消息');
      this.$message.error('这是第三条消息');
    },
    closeAll() {
      this.$message.closeAll();
    },
  },
};
</script>

<style scoped>
  .t-button + .t-button {
    margin-left: 16px;
  }
</style>
