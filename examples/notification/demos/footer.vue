<template>
  <div>
    <t-notification title="自定义底部详情(函数)" content="这是一条消息通知" :footer="footer" />
    <t-notification title="自定义底部详情(插槽)" content="这是一条消息通知">
      <template #footer>
        <div class="t-notification__detail">
          <span class="t-notification__detail--item">重启</span>
          <span class="t-notification__detail--item t-is-active">查看详情</span>
        </div>
      </template>
    </t-notification>
  </div>
</template>

<script lang="jsx">
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
