<template>
  <div class="tag-demo">
    <div class="tdesign-demo-block">
      <t-tag size="small">标签 小</t-tag>
      <t-tag>标签 中</t-tag>
      <t-tag size="large">标签 大</t-tag>
    </div>
    <div class="tdesign-demo-block">
      <t-tag size="small" theme="primary">标签 小</t-tag>
      <t-tag theme="primary">标签 中</t-tag>
      <t-tag size="large" theme="primary">标签 大</t-tag>
    </div>
  </div>
</template>

<style scoped>
.tag-demo .tdesign-demo-block {
  width: 500px;
  display: flex;
  justify-content: space-around;
}
</style>
