<template>
  <div>
    <div class="tag-demo">
      <t-tag>标签一</t-tag>
      <t-tag theme="primary">标签一</t-tag>
    </div>
    <div class="tag-demo">
      <t-tag shape="round">标签一</t-tag>
      <t-tag shape="round" theme="primary">标签一</t-tag>
    </div>
    <div class="tag-demo">
      <t-tag shape="mark">标签一</t-tag>
      <t-tag shape="mark" theme="primary">标签一</t-tag>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tag-demo {
  width: 500px;
  display: flex;
  margin-bottom: 15px;
  > * {
    margin-right: 30px;
  }
}
</style>
