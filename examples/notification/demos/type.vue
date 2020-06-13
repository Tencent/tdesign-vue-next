<template>
  <div>
    <div class="wrap">
      <h3>1.基础消息通知：</h3>
      <t-notification :visible="true" title="标题名称" content="这是一条可以自动关闭的消息通知" />
    </div>
    <div class="wrap">
      <h3>2.带图标消息通知：</h3>
      <t-notification :visible="true" title="标题名称" content="这是一条可以自动关闭的消息通知" theme="success" />
    </div>
    <div class="wrap">
      <h3>3.带操作消息通知：</h3>
      <t-notification
        :visible="true"
        title="标题名称"
        content="这是一条可以自动关闭的消息通知"
        :footer="h => h('div', { class: 't-notification__detail' },[h('span', { class: 't-notification__detail--item' }, '重启')])" />
    </div>
  </div>
</template>

<style scoped>
.wrap{
  margin-bottom: 20px;
  font-size: 18px;
}
</style>
