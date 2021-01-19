<template>
  <div>
    <t-notification title="自定义内容(字符串)" content="这是一条消息通知" />
    <t-notification title="自定义内容(函数)" :content="content" />
    <t-notification title="自定义内容(插槽)">
      <span>这是一条消息通知</span>
    </t-notification>
  </div>
</template>

<script>
export default {
  methods: {
    content() {
      return (
        <div>这是一条消息通知</div>
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
