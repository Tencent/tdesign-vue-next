<template>
  <div class="loading-demo">
    <span>小</span>
    <t-loading :loading="true" :size="'small'"></t-loading>
    <span>中</span>
    <t-loading :loading="true" :size="'middle'"></t-loading>
    <span>大</span>
    <t-loading :loading="true" :size="'large'"></t-loading>
  </div>
</template>
<style scoped>
.loading-demo span {
  margin-right: 20px;
}
</style>
