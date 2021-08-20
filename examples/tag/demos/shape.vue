<template>
  <div class="tag-demo">
    <div class="tdesign-demo-block">
      正常
      <t-tag>标签一</t-tag>
      <t-tag theme="primary">标签一</t-tag>
    </div>
    <div class="tdesign-demo-block">
      圆角
      <t-tag shape="round">标签一</t-tag>
      <t-tag shape="round" theme="primary">标签一</t-tag>
    </div>
    <div class="tdesign-demo-block">
      标记
      <t-tag shape="mark">标签一</t-tag>
      <t-tag shape="mark" theme="primary">标签一</t-tag>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tag-demo .tdesign-demo-block {
  width: 300px;
  display: flex;
  justify-content: space-around;
}
</style>
