<template>
  <div>
    <t-notification
      theme="info"
      title="标题名称"
      content="这是一条消息通知"
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

