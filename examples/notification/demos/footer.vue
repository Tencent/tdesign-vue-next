<template>
  <div>
    <t-notification title="自定义底部详情(函数)" default="这是一条消息通知" :footer="footer" />
    <t-notification title="自定义底部详情(插槽)" default="这是一条消息通知">
      <div slot="footer" class="t-notification__detail">
        <span class="t-notification__detail--item">重启</span>
        <span class="t-notification__detail--item t-is-active">查看详情</span>
      </div>
    </t-notification>
  </div>
</template>

<script>
export default {
  methods: {
    footer() {
      return (<div slot="footer" class="t-notification__detail">
        <span class="t-notification__detail--item t-is-active">查看详情</span>
      </div>);
    },
  },
};
</script>

<style scoped>
.t-notification + .t-notification{
  margin-top: 20px;
}
</style>
