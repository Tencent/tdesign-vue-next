<template>
  <div>
    <div class="wrap">
      <h3>1.宽度固定400px：</h3>
      <t-notification :visible="true" title="标题名称" content="这是一条可以自动关闭的消息通知" />
    </div>
    <div class="wrap">
      <h3>2.最多支持三行文字：</h3>
      <t-notification :visible="true" title="标题名称" content="文案不限长度，但是展示最大哦显示三行折行的末尾处显示折行的末尾处显示折行的末尾处" theme="success" />
      <br>
      <t-notification
        :visible="true"
        title="标题名称"
        content="文案不限长度，但是展示最大哦显示三行折行的末尾处显示折行的末尾处显示折行的末尾处显示折行的末尾处显示折行的末尾处显示折行的末尾处显示折行的末尾处显示折行的末尾处显示折行的末尾处显示折行的"
        :footer="h => h('div', { class: `t-notification__detail` },[h('span', { class: 't-notification__detail--item' }, '重启'),h('span', { class: 't-notification__detail--item t-notification__detail--active' }, '稍后提醒我')])" />
    </div>
  </div>
</template>

<style scoped>
.wrap{
  margin-bottom: 20px;
  font-size: 18px;
}
</style>
