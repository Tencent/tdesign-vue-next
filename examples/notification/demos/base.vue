<template>
  <div>
    <t-button @click="showDefault">默认</t-button>
    <t-button @click="showNoClose">不可自动关闭</t-button>
  </div>
</template>

<script>
export default {
  methods: {
    showDefault() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
      });
    },
    showNoClose() {
      this.$notify({
        title: '标题名称',
        content: '这是一条不会自动关闭的消息通知',
        duration: 0,
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
