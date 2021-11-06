<template>
  <div>
    <t-notification
      theme="info"
      title="普通通知"
      content="这是一条普通的消息通知"
    />
    <t-notification
      theme="error"
      title="危险通知"
      content="这是一条危险的消息通知"
    />
    <t-notification
      theme="warning"
      title="告警通知"
      content="这是一条告警的消息通知"
    />
    <t-notification
      theme="success"
      title="成功通知"
      content="这是一条成功的消息通知"
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
