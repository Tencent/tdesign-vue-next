<template>
  <div class="tdesign-demo-item--input__input-box">
    <t-addon prepend="http://">
      <t-input placeholder="请输入内容" />
    </t-addon>

    <t-addon append=".com">
      <t-input placeholder="请输入内容" />
    </t-addon>

    <t-addon
      prepend="http://"
      append=".com"
    >
      <t-input placeholder="请输入内容" />
    </t-addon>
  </div>
</template>
<style scoped>
.t-addon + .t-addon{
  margin-top: 16px;
}
</style>
