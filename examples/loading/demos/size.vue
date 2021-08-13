<template>
  <div class="loading-demo">
    <div>
      <t-loading size="small" text='加载中（小）...'></t-loading>
    </div>
    <div>
      <t-loading size="medium" text='加载中（中）...'></t-loading>
    </div>
    <div>
      <t-loading size="large" text='加载中（大）...'></t-loading>
    </div>
  </div>
</template>
<style scoped>
.loading-demo > div + div {
  margin-top: 28px;
}
</style>
