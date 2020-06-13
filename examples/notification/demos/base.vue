<template>
  <t-notification :visible="true" title="标题名称" content="这是一条可以自动关闭的消息通知" :showClose="h => h('div', 'da')" :closed="()=>{console.log(123)}" footer="footer">
    <h1 slot="footer">defaults</h1>
  </t-notification>
</template>
