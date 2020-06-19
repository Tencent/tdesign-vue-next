<template>
  <div class="t-demo-message">
    <div>
      <t-message theme="info" :close="true">用户表示普通操作信息提示</t-message>
    </div>
    <div>
      <t-message theme="success" :close="true">用户表示操作顺利达成</t-message>
    </div>
    <div>
      <t-message theme="warning" :close="true">用户表示操作引起一定后果</t-message>
    </div>
    <div>
      <t-message theme="error" :close="true">用户表示操作引起严重的后果</t-message>
    </div>
    <div>
      <t-message theme="question" :close="true">用于帮助用户操作的信息提示</t-message>
    </div>
    <div>
      <t-message theme="loading" :close="true">用于表示操作正在生效的过程中</t-message>
    </div>
  </div>
</template>
