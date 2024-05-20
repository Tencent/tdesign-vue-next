<template>
  <t-space :size="32">
    <t-badge :count="2">
      <div class="badge-block"></div>
    </t-badge>
    <t-badge :count="0" show-zero>
      <div class="badge-block"></div>
    </t-badge>
    <t-badge :count="100">
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
