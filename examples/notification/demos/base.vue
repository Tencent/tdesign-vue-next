<template>
  <div>
    <t-notification
      title="标题名称"
      v-if="visible1"
      :duration="closeTime"
      @duration-end="visible1 = false"
      default="这是一条可以自动关闭的消息通知(10s)"
    />
    <t-notification
      title="标题名称"
      closeBtn
      v-if="visible2"
      default="这是一条可以手动关闭的消息通知"
      @click-close-btn="visible2 = false"
    />
    <t-button @click="visible1 = !visible1" :disabled="visible1">显示自动关闭通知</t-button>
    <t-button @click="visible2 = !visible2" :disabled="visible2">显示手动关闭通知</t-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible1: true,
      visible2: true,
      closeTime: 10000,
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

