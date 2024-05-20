<template>
  <t-space>
    <t-checkbox>未选中项</t-checkbox>
    <t-checkbox indeterminate>半选状态</t-checkbox>
    <t-checkbox :checked="true">选中项</t-checkbox>
    <t-checkbox disabled :checked="false">未选禁用项</t-checkbox>
    <t-checkbox disabled :checked="true">选中禁用项</t-checkbox>
  </t-space>
</template>

<style scoped>
.t-checkbox + .t-checkbox {
  margin-left: 16px;
}
</style>
