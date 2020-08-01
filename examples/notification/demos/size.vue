<template>
  <div>
    <t-notification title="宽度固定400px" default="这是一条消息通知" />
    <t-notification title="文本内容最多支持三行" :default="content" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '这是一条内容为************************************************************************************************************************************************************的消息通知',
    };
  },
};
</script>

<style scoped>
.t-notification + .t-notification{
  margin-top: 20px;
}
</style>
