<template>
  <div>
    <t-button @click="showInOffset">
      偏移的信息
    </t-button>
    <t-button @click="showInOffset2">
      偏移的信息
    </t-button>
  </div>
</template>

<script>
export default {
  methods: {
    showInOffset() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        offset: {
          top: 30,
          right: 30,
        },
        duration: 3000,
      });
    },
    showInOffset2() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        placement: 'top-left',
        offset: {
          top: 30,
          left: 30,
        },
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
