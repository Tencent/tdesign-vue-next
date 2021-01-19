<template>
  <div class="tdesign-radio-base">
    <div class="tdesign-demo-block">
      <t-radio>未选中项</t-radio>
      <t-radio :checked="true">选中项</t-radio>
      <t-radio disabled>选中禁用态</t-radio>
      <t-radio :checked="false" disabled>未选中禁用态</t-radio>
    </div>
  </div>
</template>

<style>
.tdesign-radio-base .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
