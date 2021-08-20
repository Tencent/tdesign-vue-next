<template>
  <div>
    <t-notification
      theme="info"
      title="标题名称"
      content="这是一条消息通知"
    />
    <t-notification
      v-if="show"
      theme="info"
      title="标题名称"
      content="这是一条消息通知（展示5秒后消失）"
      :duration="5000"
      @duration-end="show = false"
    />
    <t-button @click="show = true" v-if="!show">点击打开计时通知</t-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    };
  },
};
</script>
<style scoped>
.t-notification + .t-notification {
  margin-top: 20px;
}

.t-button {
  margin: 20px 20px 20px 0;
}
</style>
