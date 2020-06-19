<template>
  <div class="t-demo-message">
    <div>
      <t-message theme="info">用户表示普通操作信息提示</t-message>
    </div>
    <div>
      <t-message theme="success">用户表示操作顺利达成</t-message>
    </div>
    <div>
      <t-message theme="warning">用户表示操作引起一定后果</t-message>
    </div>
    <div>
      <t-message theme="error">用户表示操作引起严重的后果</t-message>
    </div>
    <div>
      <t-message theme="question">用于帮助用户操作的信息提示</t-message>
    </div>
    <div>
      <t-message theme="loading">用于表示操作正在生效的过程中</t-message>
    </div>
  </div>
</template>

<style lang="less">
.t-demo-message {
  .t-message {
    margin-bottom: 24px;
  }
}
</style>
