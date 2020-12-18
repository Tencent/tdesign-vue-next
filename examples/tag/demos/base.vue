<template>
  <div class="tag-demo">
    <div class="tdesign-demo-block">
      <t-tag>默认</t-tag>
      <a class="demo-link">
        <t-tag>超链接</t-tag>
      </a>
      <t-tag disabled>失效标签</t-tag>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tag-demo .tdesign-demo-block {
  width: 500px;
  display: flex;
  justify-content: space-around;
  .demo-link {
    &:hover {
      .t-tag {
        color: #2a6fdf;
        border-color: currentColor;
        cursor: pointer;
      }
    }
  }
}
</style>
