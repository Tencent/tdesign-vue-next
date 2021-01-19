<template>
  <div class="tdesign-tag-icon">
    <div class="tdesign-demo-block">
      自定义图标标签：
      <t-tag class="custom-icon" :icon="renderIcon">标签</t-tag>
    </div>
    <div class="tdesign-demo-block">
      图标标签：
      <t-tag :icon="renderSearchIcon">标签</t-tag>
    </div>
  </div>
</template>

<script>
import TIconSearch from '@tencent/tdesign-vue/lib/icon/search';
export default {
  methods: {
    renderIcon() {
      return (<span>&times;</span>);
    },
    renderSearchIcon() {
      return <TIconSearch />;
    },
  },
};
</script>

<style lang="less">
// 自定义的 icon，如果样式有问题，可以自己修正一下
.custom-icon .t-icon {
  line-height: 11px;
}
</style>
