<template>
  <t-space :size="32">
    <t-badge shape="circle" count="2">
      <div class="badge-block"></div>
    </t-badge>
    <t-badge shape="round" count="99">
      <div class="badge-block"></div>
    </t-badge>
  </t-space>
</template>

<style scoped>
.badge-block {
  width: 40px;
  height: 40px;
  background: #eeeeee;
  border: 1px solid #dcdcdc;
  box-sizing: border-box;
  border-radius: 3px;
}
</style>
