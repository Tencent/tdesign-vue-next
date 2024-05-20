<template>
  <t-space>
    <t-space direction="vertical">
      <t-input-number :default-value="100" align="left" />
      <t-input-number :default-value="200" align="center" />
      <t-input-number :default-value="300" align="right" />
    </t-space>
    <t-space direction="vertical" style="margin-left: 100px">
      <t-input-number :default-value="100" align="left" theme="normal" />
      <t-input-number :default-value="200" align="center" theme="normal" />
      <t-input-number :default-value="300" align="right" theme="normal" />
    </t-space>
  </t-space>
</template>
