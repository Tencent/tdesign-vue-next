<template>
  <div>
    <t-button @click="show">宽度固定400px</t-button>
    <t-button @click="showText">文本内容最多支持三行</t-button>
  </div>
</template>

<script>
export default {
  methods: {
    show() {
      this.$notify({
        title: '标题名称',
        content: '这是一条可以自动关闭的消息通知',
      });
    },
    showText() {
      this.$notify({
        title: '标题名称',
        content: '这是一条内容为************************************************************************************************************************************************************的消息通知',
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
