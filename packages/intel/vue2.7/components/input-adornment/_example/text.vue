<template>
  <t-space direction="vertical" style="max-width: 500px">
    <t-input-adornment prepend="http://">
      <t-input placeholder="请输入内容" />
    </t-input-adornment>

    <t-input-adornment append=".com">
      <t-tag-input placeholder="请输入内容" />
    </t-input-adornment>

    <t-input-adornment prepend="http://" append=".com">
      <t-input placeholder="请输入内容" />
    </t-input-adornment>
  </t-space>
</template>
