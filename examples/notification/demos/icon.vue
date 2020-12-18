<template>
  <div>
    <t-notification
      theme="info"
      title="普通通知"
      v-if="visible1"
      @click-close-btn="visible1 = false"
      default="这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知"
    />
    <t-notification
      theme="error"
      title="危险通知"
      v-if="visible2"
      @click-close-btn="visible2 = false"
      default="这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知"
    />
    <t-button @click="visible1 = !visible1" :disabled="visible1">显示普通通知</t-button>
    <t-button @click="visible2 = !visible2" :disabled="visible2">显示危险通知</t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible1: true,
      visible2: true,
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
