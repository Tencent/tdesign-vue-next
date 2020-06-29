<template>
  <div>
    <t-button @click="showInTopLeft">左上角</t-button>
    <t-button @click="showInTopRight">右上角</t-button>
    <br /><br />
    <t-button @click="showInBottomLeft">左下角</t-button>
    <t-button @click="showInBottomRight">右下角</t-button>
  </div>
</template>

<script>
export default {
  methods: {
    showInTopLeft() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        placement: 'top-left',
        duration: 3000,
      });
    },
    showInTopRight() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        duration: 3000,
      });
    },
    showInBottomLeft() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        placement: 'bottom-left',
        duration: 3000,
      });
    },
    showInBottomRight() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
        placement: 'bottom-right',
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
