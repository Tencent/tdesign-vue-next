<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-input status="success" default-value="成功状态" />
    <t-input status="warning" default-value="警告状态" />
    <t-input status="error" default-value="错误状态" />
    <br /><br /><br />
    <t-input status="success" default-value="成功状态" tips="校验通过文本提示" />
    <t-input status="warning" default-value="警告状态" tips="校验不通过文本提示" />
    <t-input status="error" default-value="错误状态" tips="校验存在严重问题文本提示" />
  </div>
</template>

<style scoped>
.t-input + .t-input {
  margin-top: 16px;
}
</style>
