<template>
  <div class="tdesign-radio-base">
    <div class="tdesign-demo-block">
      <t-radio>未选中转项</t-radio>
      <t-radio :checked="true">选中项</t-radio>
      <t-radio :checked="false" disabled>未选禁用项</t-radio>
      <t-radio :checked="true" disabled>选中禁用项</t-radio>
      <t-radio :defaultChecked="false">default uncheck</t-radio>
      <t-radio :defaultChecked="true">default check</t-radio>
    </div>
  </div>
</template>

<style>
.tdesign-radio-base .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
