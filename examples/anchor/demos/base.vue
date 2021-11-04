<template>
  <div :id="`${path}#default`" class='anchor-demo' style="display: flex">
    <div style="flex:1"></div>
    <t-anchor :affixProps="{ offsetTop: 150 }">
      <t-anchor-item href="#基础锚点" title="基础锚点"></t-anchor-item>
      <t-anchor-item href="#多级锚点" title="多级锚点"></t-anchor-item>
      <t-anchor-item href="#指定容器锚点" title="指定容器锚点"></t-anchor-item>
      <t-anchor-item href="#特定交互锚点" title="特定交互锚点"></t-anchor-item>
      <t-anchor-item href="#尺寸" title="尺寸"></t-anchor-item>
      <t-anchor-item :href="`#${path}#anchor-target-6`" title="保密协议"></t-anchor-item>
      <t-anchor-item :href="`#${path}#anchor-target-7`" title="其他"></t-anchor-item>
    </t-anchor>
  </div>
</template>
<script>
import { defineComponent, computed, getCurrentInstance } from 'vue'
import get from 'lodash/get';

export default defineComponent({
  setup() {
    const { ctx } = getCurrentInstance();
    const path = computed(() => {
      return get(ctx, '$route.path', '');
    })
    return { path };
  },
});
</script>
<style lang='less' scoped>
.anchor-demo {
  border: 1px solid transparent;
  padding: 20px;
  margin: -20px;
}
.anchor-demo:target {
  border-color: #1890ff;
}
</style>