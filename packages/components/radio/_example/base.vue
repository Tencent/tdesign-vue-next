<template>
  <t-space>
    <t-radio>未选中项</t-radio>
    <t-radio allow-uncheck> 可取消选中项 </t-radio>
    <t-radio :checked="true"> 选中项 </t-radio>
    <t-radio :checked="true" disabled> 选中禁用态 </t-radio>
    <t-radio disabled> 未选中禁用态 </t-radio>
  </t-space>
</template>

<style>
.tdesign-radio-base .tdesign-demo-block {
  display: flex;
  justify-content: space-around;
}
</style>
