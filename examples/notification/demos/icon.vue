<template>
  <div>
    <t-notification
      theme="info"
      title="普通通知"
      content="这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知"
    />
    <t-notification
      theme="error"
      title="危险通知"
      content="这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知"
    />
    <t-notification
      theme="warning"
      title="告警通知"
      content="这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知"
    />
    <t-notification
      theme="success"
      title="成功通知"
      content="这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知这是一条消息通知"
    />
  </div>
</template>

<style scoped>
.t-notification + .t-notification {
  margin-top: 20px;
}

.t-button {
  margin: 20px 20px 20px 0;
}
</style>
