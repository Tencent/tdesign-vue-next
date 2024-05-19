<template>
  <t-space>
    <t-checkbox>未选中项</t-checkbox>
    <t-checkbox>未选悬停项</t-checkbox>
    <t-checkbox :default-checked="true"> 选中项 </t-checkbox>
    <t-checkbox disabled> 未选禁用项 </t-checkbox>
    <t-checkbox disabled :default-checked="true"> 选中禁用项 </t-checkbox>
  </t-space>
</template>
