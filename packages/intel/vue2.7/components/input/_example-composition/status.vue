<template>
  <t-space class="t-demo__input-status" :size="80" style="max-width: 800px">
    <t-space direction="vertical">
      <t-input disabled default-value="禁用状态" />
      <t-input readonly default-value="只读状态" />
    </t-space>
    <t-space direction="vertical">
      <t-input default-value="成功状态" />
      <t-input status="success" default-value="成功状态" />
      <t-input status="warning" default-value="警告状态" />
      <t-input status="error" default-value="错误状态" />
    </t-space>
    <t-space direction="vertical">
      <t-input default-value="普通状态" tips="这是普通文本提示" />
      <t-input status="success" default-value="成功状态" tips="校验通过文本提示" />
      <t-input status="warning" default-value="警告状态" tips="校验不通过文本提示" />
      <t-input status="error" default-value="错误状态" tips="校验存在严重问题文本提示" />
    </t-space>
  </t-space>
</template>

<style>
.t-demo__input-status .t-space-item {
  margin-bottom: 12px;
}
</style>
