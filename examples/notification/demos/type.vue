<template>
  <div>
    <t-notification theme="info" title="信息" default="这是一条消息通知" />
    <t-notification theme="success" title="成功" default="这是一条消息通知" />
    <t-notification theme="warning" title="警告" default="这是一条消息通知" />
    <t-notification theme="error" title="错误" default="这是一条消息通知" />
  </div>
</template>

<style scoped>
.t-notification + .t-notification {
  margin-top: 20px;
}
</style>
