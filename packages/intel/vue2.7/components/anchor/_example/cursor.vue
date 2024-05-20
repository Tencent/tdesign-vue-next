<template>
  <div class="anchor-demo">
    <t-anchor :bounds="150">
      <template #cursor>
        <div class="test-cursor"></div>
      </template>
      <t-anchor-item href="#基础锚点" title="基础锚点"></t-anchor-item>
      <t-anchor-item href="#多级锚点" title="多级锚点"></t-anchor-item>
      <t-anchor-item href="#指定容器锚点" title="指定容器锚点"></t-anchor-item>
      <t-anchor-item href="#特定交互锚点" title="特定交互锚点"></t-anchor-item>
      <t-anchor-item href="#尺寸" title="尺寸"></t-anchor-item>
    </t-anchor>
  </div>
</template>

<style lang="less" scoped>
.anchor-demo {
  border: 1px solid transparent;
  padding: 20px;
  margin: -20px;

  .test-cursor {
    width: 10px;
    height: 10px;
    background-color: var(--text-color-brand, #0052d9);
    position: absolute;
    border-radius: 50%;
    left: 50%;
    margin-left: -5px;
    top: 50%;
    margin-top: -5px;
  }
}
</style>
