<template>
  <div class="tdesign-tag-default">
    <t-tag>默认</t-tag>
    <a class="demo-link">
      <t-tag>超链接</t-tag>
    </a>
  </div>
</template>

<style lang="less">
.demo-link {
  &:hover {
    .t-tag {
      color: #2a6fdf;
      border-color: currentColor;
      cursor: pointer;
    }
  }
}
</style>
