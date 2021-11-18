<template>
  <div class="tag-demo">
    <t-tag size="small">
      小型标签
    </t-tag>
    <t-tag>默认标签</t-tag>
    <t-tag size="large">
      大型标签
    </t-tag>
  </div>
</template>

<style lang="less" scoped>
.tag-demo {
  width: 500px;
  display: flex;
  > * {
    margin-right: 30px;
  }
}
</style>
