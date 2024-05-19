<template>
  <t-space>
    <div class="flex: 1"></div>
    <t-anchor :bounds="150" :getCurrentAnchor="getCurrentAnchor">
      <t-anchor-item href="#基础锚点" title="基础锚点"></t-anchor-item>
      <t-anchor-item href="#多级锚点" title="多级锚点"></t-anchor-item>
      <t-anchor-item href="#指定容器锚点" title="指定容器锚点"></t-anchor-item>
      <t-anchor-item href="#特定交互锚点" title="特定交互锚点"></t-anchor-item>
      <t-anchor-item href="#尺寸" title="尺寸">
        <t-anchor-item href="#size-1" title="尺寸1">
          <div id="default">this is children content</div>
          <div>sdadasas</div>
        </t-anchor-item>
        <t-anchor-item href="#size-2" title="尺寸2">
          <t-anchor-item href="#size-3" title="尺寸1"></t-anchor-item>
        </t-anchor-item>
      </t-anchor-item>
    </t-anchor>
  </t-space>
</template>
<script>
export default {
  data() {
    return {
      getCurrentAnchor(value) {
        console.log('value1', value);
        return value || '#多级锚点';
      },
    };
  },
};
</script>
