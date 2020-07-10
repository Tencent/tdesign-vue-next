<template>
  <div>
    <t-button @click="toggle">自由控制关闭时机（{{ notification ? '关闭' : '打开' }}）</t-button>
    <br /><br />
    <t-button @click="openAll">点击打开多个消息</t-button>
    <t-button @click="closeAll">点击关闭多个消息</t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notification: null,
    };
  },
  methods: {
    toggle() {
      if (!this.notification) {
        this.notification = this.$notify({
          title: '标题名称',
          content: '这是一条需要手动关闭的消息通知',
        });
      } else {
        // 另一种关闭方法：this.notification.then(ins => ins.close());
        this.$notify.close(this.notification);
        this.notification = null;
      }
    },
    openAll() {
      this.$notify({
        title: '标题名称',
        content: '这是一条需要手动关闭的消息通知',
      });
      this.$notify({
        title: '标题名称',
        content: '这是一条需要手动关闭的消息通知',
      });
    },
    closeAll() {
      this.$notify.closeAll();
    },
  },
};
</script>

<style scoped>
  .t-button + .t-button {
    margin-left: 16px;
  }
</style>
