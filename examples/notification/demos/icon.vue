<template>
  <div>
    <t-notification title="自定义关闭按钮(函数)" default="这是一条消息通知" :icon="icon" />
    <t-notification title="自定义关闭按钮(插槽)" default="这是一条消息通知">
      <template slot="icon">Icon</template>
    </t-notification>
  </div>
</template>

<script>
export default {
  methods: {
    icon() {
      return (
        <span>Icon</span>
      );
    },
  },
};
</script>

<style scoped>
.t-notification + .t-notification{
  margin-top: 20px;
}
</style>
